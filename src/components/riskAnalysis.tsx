import React, { useState } from 'react';
import { AlertCircle, TrendingUp, TrendingDown, Loader2, BarChart3 } from 'lucide-react';

const RiskAnalysis = () => {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const demoModel = {
    feature_names: [
      'City', 'Location_Score', 'Internal_Audit_Score', 'External_Audit_Score',
      'Fin_Score', 'Loss_score', 'Past_Results'
    ],
    feature_importance: {
      'Internal_Audit_Score': 0.23,
      'External_Audit_Score': 0.21,
      'Fin_Score': 0.19,
      'Loss_score': 0.17,
      'Location_Score': 0.10,
      'Past_Results': 0.07,
      'City': 0.03
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const calculateRiskScore = (data) => {
    let riskScore = 0;
    const factors = [];

    if (data.Internal_Audit_Score >= 12) {
      riskScore += 25;
      factors.push('High Internal Audit score (indicating internal control issues)');
    } else if (data.Internal_Audit_Score >= 10) {
      riskScore += 15;
      factors.push('Fairly high Internal Audit score.');
    }

    if (data.External_Audit_Score >= 12) {
      riskScore += 25;
      factors.push('High External Audit score (indicating external audit issues)');
    } else if (data.External_Audit_Score >= 10) {
      riskScore += 15;
      factors.push('Fairly high External Audit score.');
    }

    if (data.Fin_Score >= 12) {
      riskScore += 20;
      factors.push('High Financial score (indicating financial problems)');
    } else if (data.Fin_Score >= 10) {
      riskScore += 12;
      factors.push('Fairly high Financial score.');
    }

    if (data.Loss_score >= 8) {
      riskScore += 20;
      factors.push('High loss record.');
    } else if (data.Loss_score >= 6) {
      riskScore += 12;
      factors.push('Moderate loss record.');
    }

    if (data.Location_Score < 20) {
      riskScore += 15;
      factors.push('Low location score.');
    } else if (data.Location_Score < 40) {
      riskScore += 8;
      factors.push('Moderate location score.');
    }

    if (data.Past_Results >= 2) {
      riskScore += 15;
      factors.push('Poor past performance.');
    } else if (data.Past_Results >= 1) {
      riskScore += 8;
      factors.push('Some history of poor performance.');
    }

    return { riskScore, factors };
  };

  const predictRisk = () => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    setTimeout(() => {
      try {
        const missingFields = demoModel.feature_names.filter(
          name => !formData[name] && formData[name] !== 0
        );

        if (missingFields.length > 0) {
          throw new Error(`Please fill out the informations: ${missingFields.join(', ')}`);
        }

        const { riskScore, factors } = calculateRiskScore(formData);

        const isHighRisk = riskScore > 50;
        const confidence = Math.min(0.95, 0.5 + (Math.abs(riskScore - 50) / 100));

        const sortedFeatures = Object.entries(demoModel.feature_importance)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        const result = {
          prediction: isHighRisk ? 'Under Risk' : 'Not Under Risk',
          confidence: confidence,
          riskScore: riskScore,
          probability: {
            not_under_risk: isHighRisk ? 1 - confidence : confidence,
            under_risk: isHighRisk ? confidence : 1 - confidence
          },
          risk_factors: factors.length > 0 ? factors : ['There\'s no risk.'],
          top_features: sortedFeatures.map(([name, _]) => name),
          feature_importance: Object.fromEntries(sortedFeatures),
          recommendation: isHighRisk 
            ? 'Internal controls should be reviewed and improved, as well as financial risks reduced.'
            : 'The operating status is satisfactory and operations can be continued.'
        };

        setPrediction(result);
      } catch (err) {
        setError(err.message || 'There are errors during the process. Please try again later.');
        console.error('Prediction error:', err);
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const handleSubmit = () => {
    predictRisk();
  };

  return (
    <div className="min-h-screen min-h-full min-w-screen bg-[#040E18] pt-40 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-blue-950/10 border border-gray-500 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="w-12 h-12 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              XGBoost Risk Predictor
            </h1>
            <p className="text-gray-300">Business Risk Predictor</p>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  City (postal code)
                </label>
                <input
                  type="number"
                  name="City"
                  placeholder="0-44"
                  value={formData.City || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Location Score
                </label>
                <input
                  type="number"
                  name="Location_Score"
                  placeholder="0-100"
                  step="0.001"
                  value={formData.Location_Score || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Internal Audit Score
                </label>
                <input
                  type="number"
                  name="Internal_Audit_Score"
                  placeholder="0-15"
                  value={formData.Internal_Audit_Score || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  External Audit Score 
                </label>
                <input
                  type="number"
                  name="External_Audit_Score"
                  placeholder="0-15"
                  value={formData.External_Audit_Score || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Fin Score 
                </label>
                <input
                  type="number"
                  name="Fin_Score"
                  placeholder="0-15"
                  value={formData.Fin_Score || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Loss Score 
                </label>
                <input
                  type="number"
                  name="Loss_score"
                  placeholder="0-13"
                  value={formData.Loss_score || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Past Results 
                </label>
                <input
                  type="number"
                  name="Past_Results"
                  placeholder="0-10"
                  value={formData.Past_Results || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  processing...
                </>
              ) : (
                'Prediction'
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {prediction && (
            <div className={`rounded-xl p-6 border-2 ${
              prediction.prediction === 'Under Risk'
                ? 'bg-red-50 border-red-300' 
                : 'bg-green-50 border-green-300'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {prediction.prediction === 'Under Risk' ? (
                    <TrendingDown className="w-10 h-10 text-red-600 mr-3" />
                  ) : (
                    <TrendingUp className="w-10 h-10 text-green-600 mr-3" />
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {prediction.prediction}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Model's confidence: {(prediction.confidence * 100).toFixed(2)}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Risk Score: {prediction.riskScore}/100
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {prediction.prediction === 'Under Risk' ? (
                  <div className="w-24 h-24 rounded-full bg-red-500 shadow-lg flex items-center justify-center text-white">
                    <span className="text-3xl font-bold text-white">
                      {(prediction.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  ) : (
                  <div className="w-24 h-24 rounded-full bg-green-500 shadow-lg flex items-center justify-center text-white">
                    <span className="text-3xl font-bold text-white">
                      {(prediction.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  )}
                </div>
              </div>

              {/* Probability Distribution */}
              <div className="mb-6 bg-white bg-opacity-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Probability Distribution:</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Not Under Risk</span>
                      <span className="font-semibold text-green-700">
                        {(prediction.probability.not_under_risk * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${prediction.probability.not_under_risk * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Under Risk</span>
                      <span className="font-semibold text-red-700">
                        {(prediction.probability.under_risk * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${prediction.probability.under_risk * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="mb-4 bg-white bg-opacity-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Risks:</h4>
                <ul className="space-y-1">
                  {prediction.risk_factors.map((factor, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start">
                      <span className="mr-2">•</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Features */}
              <div className="mb-4 bg-white bg-opacity-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Important features (Top 5):
                </h4>
                <div className="space-y-2">
                  {prediction.top_features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-3 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 flex-1">{feature}</span>
                      <span className="text-sm text-gray-600">
                        {(prediction.feature_importance[feature] * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Advice:</h4>
                <p className="text-gray-700">{prediction.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;