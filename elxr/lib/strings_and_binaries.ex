defmodule StringsAndBinaries do
  def each(str, func) when is_binary(str), do: _each(str, func)

  defp _each(<<head::utf8, tail::binary>>, func) do
    func.(head)
    _each(tail, func)
  end

  defp _each(<<>>, _func), do: []

  def capitalize_sentences(text) do
    text
    |> String.split(~r(\. +))
    |> Enum.map(&String.capitalize/1)
    |> Enum.join(". ")
  end
end
