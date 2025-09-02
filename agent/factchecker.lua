-- factchecker.lua

-- AO agent: simple mock fact-checker
-- Input: { statement = "Some text" }
-- Output: { verdict = "true/false/misleading", confidence = 0-100 }

function handle(request)
    local statement = request.statement or ""
    
    -- Mock AI logic (replace with real AI calls if needed)
    local verdict = "true"
    local confidence = 95
    local analysis = "This is a mock fact-check. Replace with real AI logic."
    
    if string.find(string.lower(statement), "fake") then
        verdict = "false"
        confidence = 90
        analysis = "Detected false information."
    elseif string.find(string.lower(statement), "uncertain") then
        verdict = "misleading"
        confidence = 70
        analysis = "Information seems misleading."
    end

    return {
        verdict = verdict,
        confidence = confidence,
        analysis = analysis
    }
end
