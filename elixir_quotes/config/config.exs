use Mix.Config

config :elixir_quotes, file: "quotes.txt"

config :elixir_quotes, ElixirQuotes.Scheduler,
  debug_logging: false,
  jobs: [
    {"@secondly",
     fn ->
       # ElixirQuotes.Server.quote(Application.get_env(:elixir_quotes, :file))
       ElixirQuotes.Quotes.show(Application.get_env(:elixir_quotes, :file))
     end}
  ]
