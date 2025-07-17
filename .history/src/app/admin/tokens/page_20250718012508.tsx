// Updated color scheme for better visibility
const colors = {
  background: 'bg-gray-900',
  cardBg: 'bg-gray-800',
  cardBorder: 'border-gray-700',
  textPrimary: 'text-gray-100',
  textSecondary: 'text-gray-300',
  accent: {
    indigo: 'text-indigo-400',
    violet: 'text-violet-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    fuchsia: 'text-fuchsia-400',
    cyan: 'text-cyan-400'
  },
  chart: {
    indigo: '#6366f1',
    violet: '#8b5cf6',
    emerald: '#10b981',
    amber: '#f59e0b',
    fuchsia: '#ec4899',
    cyan: '#06b6d4'
  }
};

// Update the main component's JSX with new colors
return (
  <AdminAuthGuard>
    <div className={`min-h-screen ${colors.background} text-gray-100 p-4 md:p-8 space-y-6`}>
      {/* Header - Updated with brighter text */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className={`flex items-center gap-2 text-sm ${colors.textSecondary} ${colors.cardBg} hover:bg-gray-700 border ${colors.cardBorder} px-4 py-2 rounded-lg transition-colors`}
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </motion.div>

        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.textPrimary}`}>
            Token Usage Analytics
          </h1>
          <p className={`text-sm ${colors.textSecondary} mt-1`}>
            Track your AI token consumption and costs
          </p>
        </div>

        <button
          onClick={fetchData}
          className={`flex items-center gap-2 px-4 py-2 ${colors.cardBg} hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors`}
        >
          <FiRefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </header>

      {/* Date Controls - Brighter border and text */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <select
          value={timeRange}
          onChange={(e) => handleTimeRangeChange(e.target.value as TimeRange)}
          className={`w-full sm:w-40 p-2 border ${colors.cardBorder} rounded-lg ${colors.cardBg} text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${colors.textPrimary}`}
        >
          <option value="24h">Last 24h</option>
          <option value="7d">Last 7d</option>
          <option value="30d">Last 30d</option>
          <option value="90d">Last 90d</option>
          <option value="12m">Last 12m</option>
          <option value="custom">Custom</option>
        </select>
        
        {timeRange === 'custom' && (
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <div className="flex items-center gap-2 w-full">
              <input
                type="date"
                value={fromDateInput}
                onChange={(e) => setFromDateInput(e.target.value)}
                className={`flex-1 p-2 border ${colors.cardBorder} rounded-lg ${colors.cardBg} text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${colors.textPrimary}`}
              />
              <span className={`text-sm ${colors.textSecondary}`}>to</span>
              <input
                type="date"
                value={toDateInput}
                onChange={(e) => setToDateInput(e.target.value)}
                className={`flex-1 p-2 border ${colors.cardBorder} rounded-lg ${colors.cardBg} text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${colors.textPrimary}`}
              />
            </div>
            <button
              onClick={handleCustomDateApply}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards - Enhanced contrast */}
      <Grid numItems={1} numItemsSm={2} numItemsMd={3} className="gap-4 sm:gap-6">
        <Card className={`p-6 border ${colors.cardBorder} ${colors.cardBg} rounded-xl`}>
          <div className="flex items-center gap-2">
            <FiDatabase className={`${colors.accent.indigo} w-5 h-5`} />
            <Text className={`text-sm font-medium ${colors.textPrimary}`}>Total Tokens Used</Text>
          </div>
          <Metric className={`mt-2 text-3xl ${colors.accent.indigo}`}>{totalTokens.toLocaleString()}</Metric>
          <Text className={`mt-2 text-sm ${colors.textSecondary}`}>
            {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
          </Text>
        </Card>
        
        <Card className={`p-6 border ${colors.cardBorder} ${colors.cardBg} rounded-xl`}>
          <div className="flex items-center gap-2">
            <FiActivity className={`${colors.accent.emerald} w-5 h-5`} />
            <Text className={`text-sm font-medium ${colors.textPrimary}`}>Total Requests</Text>
          </div>
          <Metric className={`mt-2 text-3xl ${colors.accent.emerald}`}>{totalRequests.toLocaleString()}</Metric>
          <Text className={`mt-2 text-sm ${colors.textSecondary}`}>
            {avgTokensPerRequest.toLocaleString()} avg tokens/request
          </Text>
        </Card>
        
        <Card className={`p-6 border ${colors.cardBorder} ${colors.cardBg} rounded-xl`}>
          <div className="flex items-center gap-2">
            <FiZap className={`${colors.accent.amber} w-5 h-5`} />
            <Text className={`text-sm font-medium ${colors.textPrimary}`}>Estimated Cost</Text>
          </div>
          <Metric className={`mt-2 text-3xl ${colors.accent.amber}`}>${estimatedCost}</Metric>
          <Text className={`mt-2 text-sm ${colors.textSecondary}`}>Based on GPT-4 pricing</Text>
        </Card>
      </Grid>

      {/* Main Charts - Brighter colors */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card className={`p-6 border ${colors.cardBorder} ${colors.cardBg} rounded-xl`}>
          <div className="flex items-center gap-2">
            <FiTrendingUp className={`${colors.accent.indigo} w-5 h-5`} />
            <Title className={`text-lg font-semibold ${colors.textPrimary}`}>Daily Token Usage</Title>
          </div>
          <AreaChart
            className="mt-6 h-64"
            data={processedData}
            index="date"
            categories={["tokens"]}
            colors={[colors.chart.indigo]}
            valueFormatter={(value: number) => value.toLocaleString()}
            showAnimation
            yAxisWidth={60}
          />
        </Card>
        
        <Card className={`p-6 border ${colors.cardBorder} ${colors.cardBg} rounded-xl`}>
          <div className="flex items-center gap-2">
            <FiPieChart className={`${colors.accent.violet} w-5 h-5`} />
            <Title className={`text-lg font-semibold ${colors.textPrimary}`}>Model Distribution</Title>
          </div>
          <div className="flex flex-col lg:flex-row mt-6">
            <DonutChart
              className="h-64 w-full lg:w-1/2"
              data={modelData}
              category="value"
              index="name"
              colors={[colors.chart.indigo, colors.chart.violet, colors.chart.fuchsia, colors.chart.cyan, colors.chart.amber]}
              valueFormatter={(value: number) => value.toLocaleString()}
              showAnimation
            />
            <div className="w-full lg:w-1/2 lg:pl-6 mt-6 lg:mt-0">
              <BarList
                data={modelData.map(item => ({
                  name: item.name,
                  value: item.value,
                  icon: () => modelIcons[item.name]?.() || modelIcons['unknown']()
                }))}
                valueFormatter={(value: number) => value.toLocaleString()}
              />
            </div>
          </div>
        </Card>
      </Grid>

      {/* Bottom Chart */}
      <Card className={`p-6 border ${colors.cardBorder} ${colors.cardBg} rounded-xl`}>
        <div className="flex items-center gap-2">
          <FiBarChart2 className={`${colors.accent.emerald} w-5 h-5`} />
          <Title className={`text-lg font-semibold ${colors.textPrimary}`}>Request Volume</Title>
        </div>
        <AreaChart
          className="mt-6 h-64"
          data={processedData}
          index="date"
          categories={["requests"]}
          colors={[colors.chart.emerald]}
          valueFormatter={(value: number) => value.toLocaleString()}
          showAnimation
          yAxisWidth={60}
        />
      </Card>
    </div>
  </AdminAuthGuard>
);