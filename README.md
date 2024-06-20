# smapstrace

Explore obfuscated code with source maps.

![Smapstrace](smapstrace.jpeg)
*Smapstrace according to Bing Image Generator*

## Stacktrace analyzer

Analyze stack traces with source maps:

```bash
smapstrace stacktrace --input input-test --sourceMap out.js.map
```

Where `--sourceMap` is the source map for source code mapping and `--input` is a file containing all the stack traces to remap (see examples in `/examples/stacktrace`).
