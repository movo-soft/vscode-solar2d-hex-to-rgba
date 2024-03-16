# Solar2d Hex to normalized table

A simple extension to convert hex color codes (HTML style) to Solar2d normalized color tables.

An example is worth a thousand words:

```lua
 color = #fff          -- becomes color = { 1.00, 1.00, 1.00 }
 color = #f8af          -- becomes color = { 1.00, 0.53, 0.67, 1.00 }
 color = #ff80a040      -- becomes color = { 1.00, 0.50, 0.63, 0.25 }
```

### Shortcuts
#### converts selected text to normalized table
  - Windows/Linux: `ctrl-alt-m`
  - MacOS: `cmd-opt-m`

