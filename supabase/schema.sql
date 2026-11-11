-- WAYVEROS initial schema. Review with a database/security engineer before production.
create extension if not exists pgcrypto;

create type trip_status as enum ('processing','quality_review','completed','cancelled');
create type itinerary_status as enum ('draft','in_review','approved','delivered');

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','customer'))
);

create table if not exists trip_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id),
  package_name text not null,
  destination text not null,
  start_date date,
  end_date date,
  travelers integer not null check (travelers between 1 and 30),
  budget text,
  preferences text,
  status trip_status not null default 'processing',
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','pending','paid','refunded','failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table if not exists itineraries (
  id uuid primary key default gen_random_uuid(),
  trip_request_id uuid not null references trip_requests(id) on delete cascade,
  version integer not null check (version > 0),
  content text not null,
  status itinerary_status not null default 'draft',
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  delivered_at timestamptz,
  unique (trip_request_id, version)
);

create table if not exists trip_status_events (
  id uuid primary key default gen_random_uuid(),
  trip_request_id uuid not null references trip_requests(id) on delete cascade,
  status trip_status not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_event_id text not null unique,
  trip_request_id uuid references trip_requests(id),
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists email_deliveries (
  id uuid primary key default gen_random_uuid(),
  trip_request_id uuid references trip_requests(id) on delete set null,
  recipient text not null,
  template_key text not null,
  provider_message_id text,
  status text not null default 'queued',
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists trip_requests_customer_idx on trip_requests(customer_id, created_at desc);
create index if not exists trip_requests_status_idx on trip_requests(status, created_at desc);
create index if not exists itineraries_trip_idx on itineraries(trip_request_id, version desc);

-- Enable RLS. Public access is denied by default; server service-role routes bypass RLS.
alter table customers enable row level security;
alter table user_roles enable row level security;
alter table trip_requests enable row level security;
alter table itineraries enable row level security;
alter table trip_status_events enable row level security;
alter table payment_events enable row level security;
alter table email_deliveries enable row level security;

-- Customer can read only their own customer record and associated trip data.
create policy "customer reads own profile" on customers for select to authenticated
using (auth_user_id = auth.uid());
create policy "customer reads own trip requests" on trip_requests for select to authenticated
using (exists (select 1 from customers c where c.id = customer_id and c.auth_user_id = auth.uid()));
create policy "customer reads own itineraries" on itineraries for select to authenticated
using (exists (
  select 1 from trip_requests t join customers c on c.id = t.customer_id
  where t.id = trip_request_id and c.auth_user_id = auth.uid()
));
create policy "customer reads own status history" on trip_status_events for select to authenticated
using (exists (
  select 1 from trip_requests t join customers c on c.id = t.customer_id
  where t.id = trip_request_id and c.auth_user_id = auth.uid()
));

-- Admin access is intentionally server-mediated in this starter. Do not add broad
-- client-side admin policies until role assignment and authorization are reviewed.
