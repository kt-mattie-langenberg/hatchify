# $nin

Records that are not an exact match to any of the given values will be returned.

## Compatibility

This operator is compatible with the following types:
 `string`, `date`, `boolean`, `number`, `arrays`

## Examples

All examples use this example data:

```json
    "data": [
        {
            "type": "Todo",
            "id": "1",
            "attributes": {
                "name": "Workout",
                "due_date": "2024-12-12T06:00:00.000Z",
                "importance": 6,
                "completed": false
            },
        },
        {
            "type": "Todo",
            "id": "2",
            "attributes": {
                "name": "take out trash",
                "due_date": "2023-05-09T05:00:00.000Z",
                "importance": 9,
                "completed": false
            },
        },
        {
            "type": "Todo",
            "id": "3",
            "attributes": {
                "name": "buy more icecream",
                "due_date": "2023-07-20T05:00:00.000Z",
                "importance": 9,
                "completed": true
            },
        }
    ]
```

The `due_date` attribute is not equal to `2023-07-20T05:00:00.000Z` or `2023-05-09T05:00:00.000Z`<br>
`filter[due_date][$nin]=2023-07-20T05:00:00.000Z&filter[due_date][$nin]=2023-05-09T05:00:00.000Z`<br>

This filter will match the following records:<br>

```json

        {
            "type": "Todo",
            "id": "1",
            "attributes": {
                "name": "Workout",
                "due_date": "2024-12-12T06:00:00.000Z",
                "importance": 6,
                "completed": false
            },
        },
```