defmodule Streams do
  def fibonacci() do
    Stream.unfold({0, 1}, fn {f1, f2} -> {f1, {f2, f1 + f2}} end)
    |> Enum.take(13)
  end

  def read_file() do
    Stream.resource(
      fn -> File.open!("README.md") end,
      fn file ->
        case IO.read(file, :line) do
          data when is_binary(data) -> {[data], file}
          _ -> {:halt, file}
        end
      end,
      fn file -> File.close(file) end
    )
  end
end
