defmodule Quotes.Reader do
  def read(file_path) do
    File.read!(file_path)
    |> String.split("\n")
    |> Enum.map(&String.trim/1)
    |> Enum.filter(fn m -> String.length(m) <= 64 end)
    |> Enum.random()
  end
end
