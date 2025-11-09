const Groq = require('groq-sdk');
const ExpressError = require('./expressError');

const AIReport = async (user, budget, income, expense) => {
  const groq = new Groq({
    apiKey: process.env.AI_KEY, 
  });

  const prompt = `
You are a financial analyst embedded in an expense tracker app. You will receive four JSON objects: user, budget, income, and expense — all directly from a MongoDB database.

Your task is to:
1. Analyze the user's financial health based on their income, expenses, and budget.
2. Identify spending patterns, anomalies, or areas of concern.
3. Highlight categories where the user is overspending or underspending.
4. Offer personalized insights and actionable suggestions to improve financial habits.
5. Suggest budget adjustments or savings strategies if applicable.

Return your analysis strictly in the following JSON format:

{
  "summary": "A brief overview of the user's financial health. You have a great ... or You have a bad ...",
  "spendingInsights": [
    {
      "category": "Food",
      "status": "Overspending",
      "comment": "Spending on food exceeds the allocated budget by 25%."
    }
  ],
  "recommendations": [
    "Consider reducing dining out expenses to stay within budget.",
    "Set aside a fixed percentage of income for emergency savings."
  ],
  "savingsOpportunities": [
    {
      "category": "Subscriptions",
      "suggestion": "Review and cancel unused subscriptions to save monthly costs."
    }
  ]
}

Be clear, concise, and insightful. Use a friendly and supportive tone, but remain professional. Assume the user is not a financial expert, so avoid jargon.

Here is the data:
User: ${JSON.stringify(user, null, 2)}
Budget: ${JSON.stringify(budget, null, 2)}
Income: ${JSON.stringify(income, null, 2)}
Expense: ${JSON.stringify(expense, null, 2)}
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful financial assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'openai/gpt-oss-20b',
    });

    const responseText = completion.choices[0]?.message?.content;
    const analysis = JSON.parse(responseText); 

    return analysis;
  } catch (error) {
    return new ExpressError( error.message , 500)
  }
};


module.exports = { AIReport }