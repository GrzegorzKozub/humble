# Since configuration is shared in umbrella projects, this file
# should only configure the :events application itself
# and only for organization purposes. All other config goes to
# the umbrella root.
use Mix.Config

config :events,
  ecto_repos: [Events.Repo]

import_config "#{Mix.env()}.exs"
