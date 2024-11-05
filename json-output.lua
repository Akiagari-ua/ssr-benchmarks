-- Функция, вызываемая после завершения теста для генерации JSON-результата
done = function(summary, latency, requests)
    -- Создаем JSON-строку вручную
    local json_result = string.format([[
      {
        "requests": %d,
        "duration_in_seconds": %.2f,
        "bytes": %d,
        "errors": {
          "connect": %d,
          "read": %d,
          "write": %d,
          "timeout": %d
        },
        "latency": {
          "min": %.2f,
          "max": %.2f,
          "mean": %.2f,
          "stdev": %.2f,
          "percentiles": {
            "50": %.2f,
            "90": %.2f,
            "99": %.2f
          }
        },
        "requests_per_second": %.2f
      }
    ]],
      summary.requests,
      summary.duration / 1000000,
      summary.bytes,
      summary.errors.connect,
      summary.errors.read,
      summary.errors.write,
      summary.errors.timeout,
      latency.min / 1000,
      latency.max / 1000,
      latency.mean / 1000,
      latency.stdev / 1000,
      latency:percentile(50) / 1000,
      latency:percentile(90) / 1000,
      latency:percentile(99) / 1000,
      (summary.requests / (summary.duration / 1000000))
    )
  
    -- Записываем JSON-результат в файл
    local file = io.open("wrk-results.json", "w")
    if file then
      file:write(json_result)
      file:close()
      print("Results saved to wrk-results.json")
    else
      print("Error: unable to write to file")
    end
  end
  