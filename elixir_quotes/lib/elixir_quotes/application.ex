defmodule ElixirQuotes.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # worker(ElixirQuotes.Server, []),
      worker(ElixirQuotes.Scheduler, [])
    ]

    opts = [strategy: :one_for_one, name: ElixirQuotes.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
