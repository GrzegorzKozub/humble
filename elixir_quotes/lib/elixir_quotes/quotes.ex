defmodule ElixirQuotes.Quotes do
  def show(file_path) do
    ElixirQuotes.Reader.read(file_path)
    |> ElixirQuotes.Logger.log()
  end
end
