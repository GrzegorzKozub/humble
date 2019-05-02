defmodule Quotes.Logger do
  import IO.ANSI

  def log(quote) do
    IO.puts(light_black() <> "Quote: " <> light_white() <> quote <> reset())
  end
end
