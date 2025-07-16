import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrendingUp, FiUsers, FiGlobe, FiActivity } = FiIcons;

const Analytics = () => {
  const getVisitorsOption = () => ({
    title: {
      text: 'Website Visitors',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Unique Visitors', 'Page Views']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Unique Visitors',
        type: 'line',
        data: [1200, 1900, 3000, 5000, 7000, 8500, 9200],
        smooth: true,
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Page Views',
        type: 'line',
        data: [2400, 3800, 6000, 10000, 14000, 17000, 18400],
        smooth: true,
        itemStyle: { color: '#8B5CF6' }
      }
    ]
  });

  const getComponentUsageOption = () => ({
    title: {
      text: 'Most Used Components',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 35, name: 'Headers' },
          { value: 25, name: 'Hero Sections' },
          { value: 20, name: 'Features' },
          { value: 15, name: 'Footers' },
          { value: 5, name: 'Others' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  const getPerformanceOption = () => ({
    title: {
      text: 'Website Performance',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Load Time (ms)',
        type: 'bar',
        data: [1200, 1100, 950, 800],
        itemStyle: { color: '#10B981' }
      }
    ]
  });

  const stats = [
    {
      title: 'Total Visitors',
      value: '125,430',
      change: '+12.5%',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Websites',
      value: '2,847',
      change: '+8.2%',
      icon: FiGlobe,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Component Usage',
      value: '89,234',
      change: '+15.3%',
      icon: FiActivity,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Performance Score',
      value: '94.2',
      change: '+2.1%',
      icon: FiTrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Last 7 days
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Last 30 days
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Last 90 days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <ReactECharts option={getVisitorsOption()} style={{ height: '400px' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <ReactECharts option={getComponentUsageOption()} style={{ height: '400px' }} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <ReactECharts option={getPerformanceOption()} style={{ height: '400px' }} />
      </motion.div>
    </div>
  );
};

export default Analytics;