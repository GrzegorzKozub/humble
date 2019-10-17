# Anagram

Bigger example from Tasks and Agents chapter of Programming Elixir

## Run single instance

First, run `iex` inside the app dir:

```bash
iex -S mix
```

Then inside `iex`:

```elixir
Dictionary.start_link
Enum.map(1..4, &"words#{&1}.txt") |> WordListLoader.load_from_files
Dictionary.anagrams_of "organ"
```

## Run distributed

In 1st terminal:

```bash
iex --sname one -S mix
```

In 2nd terminal:

```bash
iex --sname two -S mix
```

```elixir
{:ok, hostname} = :inet.gethostname
Node.connect :"one@#{hostname}"
Node.list
```

In 1st terminal:

```elixir
Dictionary.start_link
WordListLoader.load_from_files(~w{words1.txt words2.txt})
```

In 2nd terminal:

```elixir
WordListLoader.load_from_files(~w{words3.txt words4.txt})
```

And finally from any terminal:

```elxir
Dictionary.anagrams_of "argon"
```

