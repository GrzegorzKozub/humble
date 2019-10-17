# Since configuration is shared in umbrella projects, this file
# should only configure the :events_web application itself
# and only for organization purposes. All other config goes to
# the umbrella root.
use Mix.Config

# General application configuration
config :events_web,
  ecto_repos: [Events.Repo],
  generators: [context_app: :events]

# Configures the endpoint
config :events_web, EventsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "D7XhmRj1mhxxkj6QeW0cBVcwuKhG4bE1a+skohnH9c5BUgPIU8b1uq/Vfn0h+CQX",
  render_errors: [view: EventsWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: EventsWeb.PubSub, adapter: Phoenix.PubSub.PG2]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
