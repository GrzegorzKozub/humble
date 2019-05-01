defmodule ElixirQuotes.MixProject do
  use Mix.Project

  def project do
    [
      app: :elixir_quotes,
      version: "0.1.0",
      elixir: "~> 1.8",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger, :quantum],
      mod: {ElixirQuotes.Application, []}
    ]
  end

  defp deps do
    [
      {:quantum, "~> 2.3"}
    ]
  end
end
