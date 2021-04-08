# vCA Tool Backend

This is a simple node server connected to redis acting as a counter for how many reviews an assessment has gotten.

## API

### GET /:id

Returns the number of reviews an assessment has gotten, or `null`:

```
{
  "reviews": 1
}
```

### POST /:id

Increments the counter and returns the new amount of reviews:

```
{
  "reviews": 2
}
```

### DELETE /:id

Decrements the counter and returns the new amount of reviews:

```
{
  "reviews": 1
}
```
