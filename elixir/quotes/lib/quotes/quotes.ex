defmodule Quotes.Quotes do
  def show(file_path) do
    Quotes.Reader.read(file_path)
    |> Quotes.Logger.log()
  end
end
