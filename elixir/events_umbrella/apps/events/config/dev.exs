# Since configuration is shared in umbrella projects, this file
# should only configure the :events application itself
# and only for organization purposes. All other config goes to
# the umbrella root.
use Mix.Config

# Configure your database
config :events, Events.Repo,
  username: "postgres",
  password: "postgres",
  database: "events_dev",
  hostname: "localhost",
  pool_size: 10
