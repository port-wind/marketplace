---
name: show-cunzhi-mcp-config
description: Show the MCP client config snippet for the upstream 寸止 server.
---

# Show Cunzhi MCP Config

1. Do not execute plugin-local scripts.
2. Present this MCP config snippet exactly:

```json
{
  "mcpServers": {
    "寸止": {
      "command": "寸止"
    }
  }
}
```

3. Remind the user that the generated reference prompt still comes from the `等一下` settings window.
