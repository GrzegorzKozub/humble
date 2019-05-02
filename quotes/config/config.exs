use Mix.Config

config :quotes, file: "quotes.txt"

config :quotes, Quotes.Scheduler,
  debug_logging: false,
  jobs: [
    {"@secondly",
     fn ->
       # Quotes.Server.quote(Application.get_env(:quotes, :file))
       Quotes.Quotes.show(Application.get_env(:quotes, :file))
     end}
  ]
