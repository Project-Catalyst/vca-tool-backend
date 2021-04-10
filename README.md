# vCA Tool Backend

This is a simple node server connected to redis acting as a counter for how many reviews an assessment has gotten.

## API

### GET /

Returns all the keys and the number of their respective reviews:

```
{
  "assesment_1": 1,
  "assesment_2": 4,
  "assesment_3": 2,
  "assesment_4": 0,
}
```

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
