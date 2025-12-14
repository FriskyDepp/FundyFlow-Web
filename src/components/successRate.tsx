import React, { useState } from "react";

const decisionTreeModel = /* decision tree data kept verbatim */ {
  "tree": {
    "type": "decision",
    "feature": "age_last_milestone_year",
    "threshold": 1.415,
    "samples": 646,
    "left": {
      "type": "decision",
      "feature": "funding_total_usd",
      "threshold": 12275000.0,
      "samples": 186,
      "left": {
        "type": "decision",
        "feature": "age_last_milestone_year",
        "threshold": 0.8877,
        "samples": 121,
        "left": {
          "type": "decision",
          "feature": "age_first_milestone_year",
          "threshold": -1.3699,
          "samples": 96,
          "left": {
            "type": "decision",
            "feature": "age_last_milestone_year",
            "threshold": -3.8164,
            "samples": 3,
            "left": {
              "type": "leaf",
              "prediction": 0,
              "prediction_label": "closed",
              "probability": 1.0,
              "samples": 1
            },
            "right": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 1.0,
              "samples": 2
            }
          },
          "right": {
            "type": "decision",
            "feature": "age_first_milestone_year",
            "threshold": 0.1233,
            "samples": 93,
            "left": {
              "type": "leaf",
              "prediction": 0,
              "prediction_label": "closed",
              "probability": 0.9737,
              "samples": 76
            },
            "right": {
              "type": "leaf",
              "prediction": 0,
              "prediction_label": "closed",
              "probability": 0.8235,
              "samples": 17
            }
          }
        },
        "right": {
          "type": "decision",
          "feature": "funding_total_usd",
          "threshold": 1200000.0,
          "samples": 25,
          "left": {
            "type": "decision",
            "feature": "funding_total_usd",
            "threshold": 71000.0,
            "samples": 12,
            "left": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 1.0,
              "samples": 1
            },
            "right": {
              "type": "leaf",
              "prediction": 0,
              "prediction_label": "closed",
              "probability": 0.9091,
              "samples": 11
            }
          },
          "right": {
            "type": "decision",
            "feature": "is_web",
            "threshold": 0.5,
            "samples": 13,
            "left": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 0.8,
              "samples": 10
            },
            "right": {
              "type": "leaf",
              "prediction": 0,
              "prediction_label": "closed",
              "probability": 1.0,
              "samples": 3
            }
          }
        }
      },
      "right": {
        "type": "decision",
        "feature": "age_first_funding_year",
        "threshold": 7.7,
        "samples": 65,
        "left": {
          "type": "decision",
          "feature": "avg_participants",
          "threshold": 4.5833,
          "samples": 59,
          "left": {
            "type": "decision",
            "feature": "funding_total_usd",
            "threshold": 15600000.0,
            "samples": 47,
            "left": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 0.875,
              "samples": 8
            },
            "right": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 0.5128,
              "samples": 39
            }
          },
          "right": {
            "type": "decision",
            "feature": "avg_participants",
            "threshold": 8.5,
            "samples": 12,
            "left": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 1.0,
              "samples": 11
            },
            "right": {
              "type": "leaf",
              "prediction": 0,
              "prediction_label": "closed",
              "probability": 1.0,
              "samples": 1
            }
          }
        },
        "right": {
          "type": "leaf",
          "prediction": 0,
          "prediction_label": "closed",
          "probability": 1.0,
          "samples": 6
        }
      }
    },
    "right": {
      "type": "decision",
      "feature": "age_first_funding_year",
      "threshold": 7.6123,
      "samples": 460,
      "left": {
        "type": "decision",
        "feature": "age_first_funding_year",
        "threshold": -0.5411,
        "samples": 452,
        "left": {
          "type": "leaf",
          "prediction": 0,
          "prediction_label": "closed",
          "probability": 1.0,
          "samples": 5
        },
        "right": {
          "type": "decision",
          "feature": "age_last_milestone_year",
          "threshold": 8.0493,
          "samples": 447,
          "left": {
            "type": "decision",
            "feature": "age_first_funding_year",
            "threshold": 1.7233,
            "samples": 371,
            "left": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 0.8378,
              "samples": 222
            },
            "right": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 0.698,
              "samples": 149
            }
          },
          "right": {
            "type": "decision",
            "feature": "age_last_milestone_year",
            "threshold": 11.4041,
            "samples": 76,
            "left": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 0.9846,
              "samples": 65
            },
            "right": {
              "type": "leaf",
              "prediction": 1,
              "prediction_label": "acquired",
              "probability": 0.8182,
              "samples": 11
            }
          }
        }
      },
      "right": {
        "type": "leaf",
        "prediction": 0,
        "prediction_label": "closed",
        "probability": 1.0,
        "samples": 8
      }
    }
  },
  "feature_names": [
    "has_VC", "has_angel", "has_roundA", "has_roundB", "has_roundC", "has_roundD",
    "avg_participants", "age_first_funding_year", "age_last_funding_year",
    "age_first_milestone_year", "age_last_milestone_year", "funding_rounds",
    "funding_total_usd", "milestones", "is_software", "is_web", "is_mobile",
    "is_enterprise", "is_advertising", "is_gamesvideo", "is_ecommerce",
    "is_biotech", "is_consulting", "is_othercategory"
  ],
  "n_classes": 2,
  "n_features": 24,
  "max_depth": 5
};

function predictFromTree(treeData, featuresDict) {
  let node = treeData.tree;
  const path = [];

  while (node.type === "decision") {
    const feature = node.feature;
    const threshold = node.threshold;
    const valueRaw = featuresDict[feature];
    const value = (valueRaw === "" || valueRaw === undefined || valueRaw === null) ? 0 : parseFloat(valueRaw) || 0;

    path.push({
      feature,
      value,
      threshold,
      comparison: value <= threshold ? '<=' : '>',
      direction: value <= threshold ? 'left' : 'right'
    });

    if (value <= threshold) {
      node = node.left;
    } else {
      node = node.right;
    }
  }

  return {
    prediction: node.prediction_label,
    probability: node.probability,
    samples: node.samples,
    path
  };
}

export default function SuccessRatePrediction() {
  const [features, setFeatures] = useState({
    has_VC: 0, has_angel: 0, has_roundA: 0, has_roundB: 0, has_roundC: 0, has_roundD: 0,
    avg_participants: 5, age_first_funding_year: 2, age_last_funding_year: 4,
    age_first_milestone_year: 1, age_last_milestone_year: 3, funding_rounds: 2,
    funding_total_usd: 5000000, milestones: 3, is_software: 0, is_web: 0,
    is_mobile: 0, is_enterprise: 0, is_advertising: 0, is_gamesvideo: 0,
    is_ecommerce: 0, is_biotech: 0, is_consulting: 0, is_othercategory: 0
  });

  const [result, setResult] = useState(null);

  const handlePredict = () => {
    const prediction = predictFromTree(decisionTreeModel, features);
    setResult(prediction);
  };

  const updateFeature = (name, value) => {
    const num = parseFloat(value);
    setFeatures(prev => ({
      ...prev,
      [name]: isNaN(num) ? '' : num
    }));
  };

  const toggleCheckbox = (name) => {
    setFeatures(prev => ({
      ...prev,
      [name]: prev[name] === 1 ? 0 : 1
    }));
  };

  const fundingFlags = ['has_VC','has_angel','has_roundA','has_roundB','has_roundC','has_roundD'];
  const ageFields = ['age_first_funding_year','age_last_funding_year','age_first_milestone_year','age_last_milestone_year'];
  const otherMetrics = ['milestones','avg_participants'];
  const industryCats = [
    'is_software','is_web','is_mobile','is_enterprise','is_advertising',
    'is_gamesvideo','is_ecommerce','is_biotech','is_consulting','is_othercategory'
  ];

  return (
    <div className="min-h-screen w-screen bg-[#040E18] flex justify-center py-30 px-4">
      <div className="w-full max-w-[1000px]">

        <div className="mb-6">
          <h1 className="text-5xl md:text-3xl font-bold text-white">Startup Success Predictor</h1>
          <p className="text-sm text-gray-300 mt-2">Enter all 24 features to see your prediction</p>
        </div>

        {/* Funding Rounds */}
        <section className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
          <h3 className="text-lg font-medium text-white font-bold">Funding Rounds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {fundingFlags.map((f) => (
              <label key={f} className="flex items-center gap-3 p-2 rounded-md bg-white/3">
                <input
                  type="checkbox"
                  id={f}
                  checked={features[f] === 1}
                  onChange={() => toggleCheckbox(f)}
                  className="h-4 w-4"
                />
                <span className="text-sm text-gray-100">{f.replace('has_', 'Has ').replace('round', 'Round ')}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Funding Information */}
        <section className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
          <h3 className="text-lg font-medium text-white">Funding Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-sm font-semibold text-gray-100">Funding Total (USD):</label>
              <input
                type="number"
                value={features.funding_total_usd ?? ''}
                onChange={(e) => updateFeature('funding_total_usd', e.target.value)}
                placeholder="เช่น 5000000"
                className="w-full rounded-lg border border-white/10 px-3 py-2 mt-1 bg-transparent text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-100">Funding Rounds:</label>
              <input
                type="number"
                value={features.funding_rounds ?? ''}
                onChange={(e) => updateFeature('funding_rounds', e.target.value)}
                placeholder="เช่น 2"
                className="w-full rounded-lg border border-white/10 px-3 py-2 mt-1 bg-transparent text-white"
              />
            </div>
          </div>
        </section>

        {/* Age Information */}
        <section className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
          <h3 className="text-lg font-medium text-white">Age Information (Years)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {ageFields.map((f, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-gray-100">{f.replace(/_/g, ' ').replace('year','Year')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={features[f] ?? ''}
                  onChange={(e) => updateFeature(f, e.target.value)}
                  placeholder="เช่น 2.5"
                  className="w-full rounded-lg border border-white/10 px-3 py-2 mt-1 bg-transparent text-white"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Other Metrics */}
        <section className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
          <h3 className="text-lg font-medium text-white">Other Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {otherMetrics.map((f, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-gray-100">{f.replace(/_/g, ' ')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={features[f] ?? ''}
                  onChange={(e) => updateFeature(f, e.target.value)}
                  placeholder="เช่น 5.5"
                  className="w-full rounded-lg border border-white/10 px-3 py-2 mt-1 bg-transparent text-white"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Industry Categories */}
        <section className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
          <h3 className="text-lg font-medium text-white">Industry Categories (Multiple selections allowed)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {industryCats.map((f, idx) => (
              <label key={idx} className="flex items-center gap-3 p-2 rounded-md bg-white/3">
                <input
                  type="checkbox"
                  id={f}
                  checked={features[f] === 1}
                  onChange={() => toggleCheckbox(f)}
                  className="h-4 w-4"
                />
                <span className="text-sm text-gray-100">{f.replace('is_','').replace(/([a-z])([A-Z])/g,'$1 $2')}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          className="w-full py-4 text-lg font-bold rounded-2xl bg-blue-500 hover:bg-blue-500/20 text-white shadow-lg transition-all"
        >
          Predict
        </button>

        {/* Prediction Result */}
        {result && (
          <div className="mt-6 p-6 rounded-2xl bg-white border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800">Prediction Result</h2>

            <div className={`${result.prediction === 'acquired' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'} p-4 rounded-md mt-4 border`}> 
              <div className="text-2xl font-bold text-black">
                {result.prediction === 'acquired' ? '✅ ACQUIRED' : '❌ CLOSED'}
              </div>
              <div className="text-lg text-black mt-2">
                <strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Based on:</strong> {result.samples} similar startups in training data
              </div>
            </div>

            <h3 className="text-md font-medium text-gray-800 mt-4"> Decision Path:</h3>
            <ol className="mt-3 space-y-3">
              {result.path.map((step, idx) => (
                <li key={idx} className="leading-relaxed text-gray-700">
                  <strong className="text-blue-600">{step.feature}</strong>:
                  <code className="bg-gray-100 px-2 py-0.5 rounded ml-2 font-mono"> {step.value.toFixed(2)} </code>
                  <strong className="text-red-600 ml-2">{step.comparison}</strong>
                  <code className="bg-gray-100 px-2 py-0.5 rounded ml-2 font-mono"> {step.threshold.toFixed(2)} </code>
                  → <span className="text-teal-600">go {step.direction}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

      </div>
    </div>
  );
}
