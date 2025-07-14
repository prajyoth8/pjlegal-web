# routes/analytics.py

@router.get("/analytics/volume-trend")
async def get_response_volume(request: Request):
    interval = request.query_params.get("interval", "daily")  # daily, monthly, yearly

    query = f"""
    SELECT 
        TO_CHAR(created_at, '{'YYYY-MM-DD' if interval == 'daily' else 'YYYY-MM' if interval == 'monthly' else 'YYYY'}') AS period,
        COUNT(*) AS response_count
    FROM chatbot_responses
    GROUP BY period
    ORDER BY period ASC
    """
    try:
        result = supabase.rpc("run_sql", {"sql": query}).execute()
        data = result.data if result.data else []

        return [
            {"date": row["period"], "responses": row["response_count"]}
            for row in data
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
