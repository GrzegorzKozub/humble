defmodule Dictionary do
  # makes the agent distributed
  @name {:global, __MODULE__}

  # api

  def start_link(), do: Agent.start_link(fn -> %{} end, name: @name)
  def add_words(words), do: Agent.update(@name, &do_add_words(&1, words))
  def anagrams_of(word), do: Agent.get(@name, &Map.get(&1, signature_of(word)))

  # impl

  defp do_add_words(map, words) do
    Enum.reduce(words, map, &add_one_word(&1, &2))
  end

  defp add_one_word(word, map) do
    Map.update(map, signature_of(word), [word], &[word | &1])
  end

  defp signature_of(word) do
    word |> to_charlist() |> Enum.sort() |> to_string()
  end
end
