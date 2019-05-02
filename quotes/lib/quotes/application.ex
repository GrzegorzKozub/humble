defmodule Quotes.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # worker(Quotes.Server, []),
      worker(Quotes.Scheduler, [])
    ]

    opts = [strategy: :one_for_one, name: Quotes.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
