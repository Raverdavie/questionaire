const translations = {
  en: {
    title: 'Nutrition Planner',
    subtitle: 'Get a personalized nutrition plan tailored to your goals',
    back: '← Back to Questionnaire',
    downloadPdf: '📥 Download PDF',
    generateButton: 'Generate Nutrition Plan',
    generating: 'Generating Plan...',
    personalInfo: 'Personal Information',
    healthGoals: 'Health & Goals',
    dietaryPreferences: 'Dietary Preferences',
    age: 'Age',
    gender: 'Gender',
    weight: 'Weight (kg)',
    height: 'Height (cm)',
    primaryGoal: 'Primary Health Goal',
    activityLevel: 'Activity Level',
    dietaryPreference: 'Dietary Preference',
    currentDiet: 'Current Diet Type',
    allergies: 'Allergies & Intolerances',
    selectGender: 'Select gender',
    selectGoal: 'Select your goal',
    selectActivity: 'Select activity level',
    selectDietPref: 'Select dietary preference',
    selectCurrentDiet: 'Select current diet',
    goals: {
      weight_loss: 'Weight Loss',
      muscle_gain: 'Muscle Gain',
      general_wellness: 'General Wellness',
      athlete_performance: 'Athletic Performance',
    },
    activityOptions: {
      sedentary: 'Sedentary (little or no exercise)',
      light: 'Light (1-3 days/week)',
      moderate: 'Moderate (3-5 days/week)',
      active: 'Active (6-7 days/week)',
      very_active: 'Very Active (2x per day)',
    },
    dietaryOptions: {
      omnivore: 'Omnivore (eat everything)',
      vegetarian: 'Vegetarian (no meat)',
      vegan: 'Vegan (no animal products)',
      pescatarian: 'Pescatarian (fish OK)',
      keto: 'Keto (low carb)',
    },
    currentDietOptions: {
      balanced: 'Balanced Diet',
      high_protein: 'High Protein',
      low_carb: 'Low Carb',
      high_carb: 'High Carb',
      calorie_restricted: 'Calorie Restricted',
    },
    plan: {
      header: 'Your Personalized Nutrition Plan',
      basedOn: 'Based on your profile and health goals',
      profile: 'Your Profile',
      dailyMacros: 'Daily Macronutrient Distribution',
      sampleMeals: 'Sample Daily Meal Plan',
      tips: 'Nutrition Tips for Your Goal',
      tipsContent: {
        goals: {
          weight_loss: [
            'Create a moderate calorie deficit (300-500 calories below TDEE)',
            'Increase protein intake to preserve muscle mass',
            'Drink plenty of water (aim for 2-3 liters daily)',
            'Avoid sugary drinks and processed foods',
          ],
          muscle_gain: [
            'Consume 300-500 calories above your TDEE',
            'Prioritize protein intake (aim for 2g per kg of body weight)',
            'Combine with a proper strength training program',
            'Ensure adequate rest and recovery (7-9 hours sleep)',
          ],
          general_wellness: [
            'Focus on balanced macronutrients and whole foods',
            'Incorporate a variety of colorful fruits and vegetables',
            'Stay hydrated throughout the day',
            'Practice portion control and mindful eating',
          ],
          athlete_performance: [
            'Time carbs around your training sessions',
            'Focus on peak performance nutrition',
            'Monitor electrolyte balance, especially when training',
            'Include foods rich in antioxidants for recovery',
          ],
        },
        dietary: {
          vegetarian: [
            'Combine different plant sources to get all amino acids',
            'Include legumes, nuts, and seeds for protein variety',
          ],
          vegan: [
            'Ensure adequate B12 intake through fortified foods or supplements',
            'Combine grains with legumes for complete proteins',
            'Consider supplementing with vitamin D and omega-3s',
          ],
        },
        activity: {
          active: [
            'Replenish electrolytes after intense training',
            'Consider post-workout nutrition within 2 hours',
          ],
        },
        general: [
          'Keep a food journal to track consistency',
          'Reassess your plan every 4-6 weeks and adjust as needed',
        ],
      },
      dietaryNotes: 'Dietary Accommodations',
    },
    langName: 'Português',
    meals: {
      omnivore: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: ['Oatmeal with berries and almonds', 'Greek yogurt (150g)', 'Honey drizzle', 'Green tea'],
        },
        {
          name: 'Mid-Morning Snack',
          time: '10:00 AM',
          foods: ['Apple', 'Peanut butter (2 tbsp)', 'Water'],
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Grilled chicken breast (150g)', 'Brown rice (150g cooked)', 'Steamed broccoli', 'Olive oil', 'Green salad'],
        },
        {
          name: 'Afternoon Snack',
          time: '4:00 PM',
          foods: ['Cottage cheese (150g)', 'Banana', 'Almonds (1 oz)'],
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          foods: ['Salmon fillet (150g)', 'Sweet potato (200g)', 'Roasted vegetables', 'Light olive oil dressing'],
        },
      ],
      vegetarian: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: ['Vegetable omelet with cheese', 'Whole wheat toast', 'Orange juice'],
        },
        {
          name: 'Mid-Morning Snack',
          time: '10:00 AM',
          foods: ['Greek yogurt', 'Granola', 'Berries'],
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Lentil and vegetable curry', 'Brown rice', 'Cucumber salad'],
        },
        {
          name: 'Afternoon Snack',
          time: '4:00 PM',
          foods: ['Cheese', 'Whole wheat crackers', 'Almonds'],
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          foods: ['Vegetable stir-fry with tofu', 'Quinoa', 'Sesame oil dressing'],
        },
      ],
      vegan: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: ['Chia seed pudding with almond milk', 'Berries', 'Granola'],
        },
        {
          name: 'Mid-Morning Snack',
          time: '10:00 AM',
          foods: ['Banana', 'Almond butter', 'Water'],
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Chickpea salad', 'Multigrain bread', 'Hummus', 'Mixed vegetables'],
        },
        {
          name: 'Afternoon Snack',
          time: '4:00 PM',
          foods: ['Cashews (1 oz)', 'Apple', 'Tahini'],
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          foods: ['Lentil and vegetable pasta', 'Whole wheat pasta', 'Tomato sauce', 'Nutritional yeast'],
        },
      ],
      pescatarian: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: ['Whole wheat pancakes', 'Fresh berries', 'Yogurt'],
        },
        {
          name: 'Mid-Morning Snack',
          time: '10:00 AM',
          foods: ['String cheese', 'Nuts', 'Apple'],
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Tuna salad', 'Whole wheat bread', 'Vegetables'],
        },
        {
          name: 'Afternoon Snack',
          time: '4:00 PM',
          foods: ['Edamame', 'Sesame seeds'],
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          foods: ['Grilled fish', 'Sweet potato', 'Roasted vegetables'],
        },
      ],
      keto: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: ['Eggs (3)', 'Avocado', 'Butter', 'Coffee with cream'],
        },
        {
          name: 'Mid-Morning Snack',
          time: '10:00 AM',
          foods: ['Almonds', 'Cheese'],
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Steak (150g)', 'Cauliflower rice', 'Butter sauce', 'Green leafy salad'],
        },
        {
          name: 'Afternoon Snack',
          time: '4:00 PM',
          foods: ['Macadamia nuts', 'Olives'],
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          foods: ['Salmon (150g)', 'Asparagus with hollandaise', 'Avocado salad'],
        },
      ],
    },
  },
  pt: {
    title: 'Planejador Nutricional',
    subtitle: 'Receba um plano nutricional personalizado para seus objetivos',
    back: '← Voltar ao Questionário',
    downloadPdf: '📥 Baixar PDF',
    generateButton: 'Gerar Plano Nutricional',
    generating: 'Gerando Plano...',
    personalInfo: 'Informações Pessoais',
    healthGoals: 'Saúde & Objetivos',
    dietaryPreferences: 'Preferências Alimentares',
    age: 'Idade',
    gender: 'Gênero',
    weight: 'Peso (kg)',
    height: 'Altura (cm)',
    primaryGoal: 'Objetivo Principal',
    activityLevel: 'Nível de Atividade',
    dietaryPreference: 'Preferência Alimentar',
    currentDiet: 'Tipo de Dieta Atual',
    allergies: 'Alergias & Intolerâncias',
    selectGender: 'Selecione o gênero',
    selectGoal: 'Selecione seu objetivo',
    selectActivity: 'Selecione o nível de atividade',
    selectDietPref: 'Selecione a preferência alimentar',
    selectCurrentDiet: 'Selecione a dieta atual',
    goals: {
      weight_loss: 'Perda de Peso',
      muscle_gain: 'Ganho de Massa',
      general_wellness: 'Bem-estar Geral',
      athlete_performance: 'Desempenho Atlético',
    },
    activityOptions: {
      sedentary: 'Sedentário (pouco ou nenhum exercício)',
      light: 'Leve (1-3 dias/semana)',
      moderate: 'Moderado (3-5 dias/semana)',
      active: 'Ativo (6-7 dias/semana)',
      very_active: 'Muito Ativo (2x por dia)',
    },
    dietaryOptions: {
      omnivore: 'Onívoro (come de tudo)',
      vegetarian: 'Vegetariano (sem carne)',
      vegan: 'Vegano (sem produtos animais)',
      pescatarian: 'Pescetariano (peixe permitido)',
      keto: 'Keto (baixo carboidrato)',
    },
    currentDietOptions: {
      balanced: 'Dieta Equilibrada',
      high_protein: 'Alta Proteína',
      low_carb: 'Baixo Carboidrato',
      high_carb: 'Alto Carboidrato',
      calorie_restricted: 'Restrita em Calorias',
    },
    plan: {
      header: 'Seu Plano Nutricional Personalizado',
      basedOn: 'Com base no seu perfil e objetivos de saúde',
      profile: 'Seu Perfil',
      dailyMacros: 'Distribuição Diária de Macronutrientes',
      sampleMeals: 'Plano Diário de Refeição Exemplo',
      tips: 'Dicas Nutricionais para Seu Objetivo',
      tipsContent: {
        goals: {
          weight_loss: [
            'Crie um déficit calórico moderado (300-500 calorias abaixo do TDEE)',
            'Aumente a ingestão de proteínas para preservar massa muscular',
            'Beba bastante água (meta 2-3 litros por dia)',
            'Evite bebidas açucaradas e alimentos processados',
          ],
          muscle_gain: [
            'Consuma 300-500 calorias acima do seu TDEE',
            'Priorize a ingestão de proteínas (objetivo 2g por kg de peso corporal)',
            'Combine com um programa adequado de treinamento de força',
            'Garanta descanso e recuperação adequados (7-9 horas de sono)',
          ],
          general_wellness: [
            'Foque em macronutrientes balanceados e alimentos integrais',
            'Inclua uma variedade de frutas e vegetais coloridos',
            'Mantenha-se hidratado ao longo do dia',
            'Pratique controle de porções e alimentação consciente',
          ],
          athlete_performance: [
            'Timing de carboidratos em torno dos treinos',
            'Foque em nutrição para desempenho máximo',
            'Monitore o equilíbrio eletrolítico, especialmente ao treinar',
            'Inclua alimentos ricos em antioxidantes para recuperação',
          ],
        },
        dietary: {
          vegetarian: [
            'Combine diferentes fontes vegetais para obter todos os aminoácidos',
            'Inclua leguminosas, nozes e sementes para variedade de proteínas',
          ],
          vegan: [
            'Garanta ingestão adequada de B12 através de alimentos fortificados ou suplementos',
            'Combine grãos com leguminosas para proteínas completas',
            'Considere suplementar vitamina D e ômega-3',
          ],
        },
        activity: {
          active: [
            'Reponha eletrólitos após treinos intensos',
            'Considere nutrição pós-treino dentro de 2 horas',
          ],
        },
        general: [
          'Mantenha um diário alimentar para acompanhar a consistência',
          'Reavalie seu plano a cada 4-6 semanas e ajuste conforme necessário',
        ],
      },
      dietaryNotes: 'Acomodações Dietéticas',
    },
    langName: 'English',
    meals: {
      omnivore: [
        {
          name: 'Café da Manhã',
          time: '7:00',
          foods: ['Aveia com frutas vermelhas e amêndoas', 'Iogurte grego (150g)', 'Mel', 'Chá verde'],
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00',
          foods: ['Maçã', 'Manteiga de amendoim (2 colheres)', 'Água'],
        },
        {
          name: 'Almoço',
          time: '13:00',
          foods: ['Peito de frango grelhado (150g)', 'Arroz integral (150g cozido)', 'Brócolis cozido no vapor', 'Azeite', 'Salada verde'],
        },
        {
          name: 'Lanche da Tarde',
          time: '16:00',
          foods: ['Queijo cottage (150g)', 'Banana', 'Amêndoas (28g)'],
        },
        {
          name: 'Jantar',
          time: '19:00',
          foods: ['Filé de salmão (150g)', 'Batata-doce (200g)', 'Legumes assados', 'Molho leve de azeite'],
        },
      ],
      vegetarian: [
        {
          name: 'Café da Manhã',
          time: '7:00',
          foods: ['Omelete de legumes com queijo', 'Pão integral', 'Suco de laranja'],
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00',
          foods: ['Iogurte grego', 'Granola', 'Frutas vermelhas'],
        },
        {
          name: 'Almoço',
          time: '13:00',
          foods: ['Curry de lentilhas e legumes', 'Arroz integral', 'Salada de pepino'],
        },
        {
          name: 'Lanche da Tarde',
          time: '16:00',
          foods: ['Queijo', 'Biscoitos integrais', 'Amêndoas'],
        },
        {
          name: 'Jantar',
          time: '19:00',
          foods: ['Stir-fry de legumes com tofu', 'Quinoa', 'Molho de gergelim'],
        },
      ],
      vegan: [
        {
          name: 'Café da Manhã',
          time: '7:00',
          foods: ['Pudim de chia com leite de amêndoas', 'Frutas vermelhas', 'Granola'],
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00',
          foods: ['Banana', 'Manteiga de amêndoa', 'Água'],
        },
        {
          name: 'Almoço',
          time: '13:00',
          foods: ['Salada de grão-de-bico', 'Pão multigrãos', 'Hummus', 'Legumes variados'],
        },
        {
          name: 'Lanche da Tarde',
          time: '16:00',
          foods: ['Castanhas (28g)', 'Maçã', 'Tahine'],
        },
        {
          name: 'Jantar',
          time: '19:00',
          foods: ['Massa de lentilha com legumes', 'Macarrão integral', 'Molho de tomate', 'Levedura nutricional'],
        },
      ],
      pescatarian: [
        {
          name: 'Café da Manhã',
          time: '7:00',
          foods: ['Panquecas integrais', 'Frutas vermelhas', 'Iogurte'],
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00',
          foods: ['Queijo em palito', 'Nozes', 'Maçã'],
        },
        {
          name: 'Almoço',
          time: '13:00',
          foods: ['Salada de atum', 'Pão integral', 'Legumes'],
        },
        {
          name: 'Lanche da Tarde',
          time: '16:00',
          foods: ['Edamame', 'Sementes de gergelim'],
        },
        {
          name: 'Jantar',
          time: '19:00',
          foods: ['Peixe grelhado', 'Batata-doce', 'Legumes assados'],
        },
      ],
      keto: [
        {
          name: 'Café da Manhã',
          time: '7:00',
          foods: ['Ovos (3)', 'Abacate', 'Manteiga', 'Café com creme'],
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00',
          foods: ['Amêndoas', 'Queijo'],
        },
        {
          name: 'Almoço',
          time: '13:00',
          foods: ['Bife (150g)', 'Arroz de couve-flor', 'Molho de manteiga', 'Salada verde'],
        },
        {
          name: 'Lanche da Tarde',
          time: '16:00',
          foods: ['Nozes de macadâmia', 'Azeitonas'],
        },
        {
          name: 'Jantar',
          time: '19:00',
          foods: ['Salmão (150g)', 'Aspargos com hollandaise', 'Salada de abacate'],
        },
      ],
    },
  },
};

export default translations;
