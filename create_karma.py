import json
import os

questions = [
  {
    "type": "vocabulary",
    "question": "The rapid ____ of urban areas has led to significant environmental challenges, requiring innovative solutions in sustainable architecture.",
    "choices": ["deterioration", "proliferation", "mitigation", "relinquishment", "exhaustion"],
    "answer": "proliferation"
  },
  {
    "type": "vocabulary",
    "question": "Despite numerous setbacks, the researchers remained ____ in their pursuit of a cure for the rare neurological disorder.",
    "choices": ["unwavering", "obsolete", "redundant", "superficial", "ambiguous"],
    "answer": "unwavering"
  },
  {
    "type": "vocabulary",
    "question": "The government’s new fiscal policy is designed to ____ the negative effects of inflation on low-income households.",
    "choices": ["aggravate", "exacerbate", "alleviate", "intensify", "perpetuate"],
    "answer": "alleviate"
  },
  {
    "type": "sentence_completion",
    "question": "____ the initial results of the study were inconclusive, the team decided to extend the research period by another six months.",
    "choices": ["Because", "Although", "Provided that", "In case", "Unless"],
    "answer": "Because"
  },
  {
    "type": "sentence_completion",
    "question": "Many historians argue that the industrial revolution was not a sudden event ____ a gradual process spanning several decades.",
    "choices": ["rather than", "but rather", "as well as", "in addition to", "so as to"],
    "answer": "but rather"
  },
  {
    "type": "sentence_completion",
    "question": "The success of the mission depends on the seamless integration of various departments, ____ any miscommunication could lead to failure.",
    "choices": ["inasmuch as", "nonetheless", "otherwise", "so that", "whereby"],
    "answer": "inasmuch as"
  },
  {
    "type": "sentence_completion",
    "question": "____ advancements in artificial intelligence are undeniable, ethical concerns regarding data privacy remain a major hurdle.",
    "choices": ["While", "Since", "Because", "As long as", "If"],
    "answer": "While"
  },
  {
    "type": "cloze",
    "question": "(Blank 1) The evolution of language is a complex process that mirrors the social and cultural changes of a society.",
    "choices": ["Initially", "Primarily", "Consequently", "Similarly", "Alternatively"],
    "answer": "Primarily"
  },
  {
    "type": "cloze",
    "question": "(Blank 2) Over centuries, words often undergo semantic shifts, ____ their original meanings are replaced by new connotations.",
    "choices": ["where", "whereby", "which", "whose", "whom"],
    "answer": "whereby"
  },
  {
    "type": "cloze",
    "question": "(Blank 3) For instance, the word 'broadcast' originally referred to the sowing of seeds, but it is now ____ associated with media.",
    "choices": ["exclusively", "hardly", "randomly", "vaguely", "temporarily"],
    "answer": "exclusively"
  },
  {
    "type": "cloze",
    "question": "(Blank 4) Such changes are not accidental; they reflect the (Blank 4) ____ needs of the speakers.",
    "choices": ["diminishing", "evolving", "stagnant", "obsolete", "superfluous"],
    "answer": "evolving"
  },
  {
    "type": "cloze",
    "question": "(Blank 5) Understanding these shifts is crucial for linguists who seek to (Blank 5) ____ the history of human communication.",
    "choices": ["obliterate", "reconstruct", "ignore", "fabricate", "contradict"],
    "answer": "reconstruct"
  },
  {
    "type": "translation",
    "question": "Sanayi Devrimi'nin sosyal yapı üzerindeki en belirgin etkisi, kırsal kesimden kentlere doğru gerçekleşen kitlesel göçtür.",
    "choices": [
      "The most prominent effect of the Industrial Revolution on the social structure is the mass migration from rural areas to cities.",
      "The Industrial Revolution caused a mass migration from rural areas to cities, affecting social structure significantly.",
      "Mass migration from rural areas to cities was one of the many effects of the Industrial Revolution.",
      "The social structure was changed by the Industrial Revolution through mass migration to cities.",
      "Migration from rural areas to cities was the primary social change during the Industrial Revolution."
    ],
    "answer": "The most prominent effect of the Industrial Revolution on the social structure is the mass migration from rural areas to cities."
  },
  {
    "type": "translation",
    "question": "Many scientists believe that the melting of polar ice caps is directly linked to the increase in greenhouse gas emissions.",
    "choices": [
      "Çoğu bilim insanı, kutup buzullarının erimesinin sera gazı emisyonlarındaki artışla doğrudan bağlantılı olduğuna inanmaktadır.",
      "Kutup buzullarının erimesi, birçok bilim insanına göre sera gazı emisyonlarının bir sonucudur.",
      "Birçok bilim insanı, sera gazı emisyonlarının kutup buzullarını erittiğini düşünmektedir.",
      "Kutup buzullarının erimesi ile sera gazı emisyonları arasındaki bağlantı bilim insanları tarafından araştırılmaktadır.",
      "Bilim insanlarının çoğu, kutup buzullarının erimesini sera gazı emisyonlarına bağlamaktadır."
    ],
    "answer": "Çoğu bilim insanı, kutup buzullarının erimesinin sera gazı emisyonlarındaki artışla doğrudan bağlantılı olduğuna inanmaktadır."
  },
  {
    "type": "translation",
    "question": "Eğitim sistemindeki reformlar, öğrencilerin sadece akademik başarılarını değil, aynı zamanda eleştirel düşünme becerilerini도 geliştirmeyi amaçlamaktadır.",
    "choices": [
      "Reforms in the education system aim to improve not only students' academic success but also their critical thinking skills.",
      "The education system reforms focus on academic success and critical thinking skills of students.",
      "Academic success and critical thinking skills are the main goals of the education system reforms.",
      "Reforms in education aim to develop students' critical thinking skills alongside their academic performance.",
      "The goal of educational reforms is to enhance students' critical thinking skills, rather than just academic success."
    ],
    "answer": "Reforms in the education system aim to improve not only students' academic success but also their critical thinking skills."
  },
  {
    "type": "translation",
    "question": "Despite its small size, the island nation has played a significant role in international trade for centuries.",
    "choices": [
      "Küçük boyutuna rağmen, ada ülkesi yüzyıllardır uluslararası ticarette önemli bir rol oynamıştır.",
      "Ada ülkesi küçük olmasına rağmen, yüzyıllardır uluslararası ticareti etkilemektedir.",
      "Uluslararası ticaretteki rolü büyük olan ada ülkesi, aslında oldukça küçüktür.",
      "Yüzyıllardır uluslararası ticarette yer alan ada ülkesi, oldukça küçük bir yüz ölçümüne sahiptir.",
      "Küçük bir ada ülkesi olmasına rağmen, uluslararası ticaretteki etkisi yüzyıllardır sürmektedir."
    ],
    "answer": "Küçük boyutuna rağmen, ada ülkesi yüzyıllardır uluslararası ticarette önemli bir rol oynamıştır."
  },
  {
    "type": "paraphrase",
    "question": "The use of renewable energy sources has increased significantly as a result of rising concerns about climate change.",
    "choices": [
      "Climate change concerns have led to a substantial growth in the utilization of renewable energy.",
      "The increase in renewable energy use is the main cause of concerns about climate change.",
      "Renewable energy sources are being used more because climate change is no longer a concern.",
      "Due to the rise in renewable energy, climate change concerns have decreased significantly.",
      "Although concerns about climate change are rising, the use of renewable energy has not increased much."
    ],
    "answer": "Climate change concerns have led to a substantial growth in the utilization of renewable energy."
  },
  {
    "type": "paraphrase",
    "question": "Hardly had the new law been implemented when the public started protesting against its strict regulations.",
    "choices": [
      "The public began to protest the strict regulations immediately after the new law came into effect.",
      "The new law was implemented despite the public's protests against its strict regulations.",
      "As soon as the public protested, the new law was implemented with strict regulations.",
      "The strict regulations of the new law were the reason why the public started protesting before it was implemented.",
      "The public protests against the new law's strict regulations were not expected until after its implementation."
    ],
    "answer": "The public began to protest the strict regulations immediately after the new law came into effect."
  },
  {
    "type": "paraphrase",
    "question": "No sooner had the scientist published his findings than his theories were challenged by his peers.",
    "choices": [
      "The scientist's theories were questioned by other experts immediately after he made his results public.",
      "Before the scientist published his results, his peers had already challenged his theories.",
      "The scientist published his findings because his peers had challenged his theories earlier.",
      "Peer challenges led the scientist to publish his findings as soon as possible.",
      "The scientist's peers did not challenge his theories until long after he published his findings."
    ],
    "answer": "The scientist's theories were questioned by other experts immediately after he made his results public."
  },
  {
    "type": "paraphrase",
    "question": "It is widely believed that the discovery of fire was a turning point in human evolution.",
    "choices": [
      "Many people think that the discovery of fire significantly changed the course of human development.",
      "The discovery of fire is the only reason why humans evolved the way they did.",
      "Humans would not have evolved if fire had not been discovered at that specific time.",
      "The turning point in human evolution was not fire, but other discoveries.",
      "It is a known fact that human evolution began with the discovery of fire."
    ],
    "answer": "Many people think that the discovery of fire significantly changed the course of human development."
  },
  {
    "type": "dialogue",
    "question": "Professor: Have you finalized the methodology for your thesis yet? \nStudent: Not quite. I'm still torn between qualitative and quantitative approaches. \nProfessor: ____ \nStudent: That makes sense. I'll focus on the specific research questions to see which one fits better.",
    "choices": [
      "Why don't you use both in a mixed-methods approach?",
      "The choice should depend on the nature of the data you intend to collect.",
      "You should have decided that by now; the deadline is approaching.",
      "I personally prefer quantitative research because it's more objective.",
      "Linguistics research usually requires a qualitative approach anyway."
    ],
    "answer": "The choice should depend on the nature of the data you intend to collect."
  },
  {
    "type": "dialogue",
    "question": "Journalist: Your latest book explores the impact of social media on teenage mental health. What was your most surprising finding? \nPsychologist: It was the fact that the negative effects are not universal; they depend heavily on how the platform is used. \nJournalist: ____ \nPsychologist: Exactly. Passive browsing seems much more harmful than active engagement.",
    "choices": [
      "So, you mean that scrolling through feeds without interacting is the main problem?",
      "Do you think social media should be banned for teenagers?",
      "Are there any positive effects of social media that you discovered?",
      "How did you conduct your research on such a sensitive topic?",
      "Which social media platform is the most dangerous according to your study?"
    ],
    "answer": "So, you mean that scrolling through feeds without interacting is the main problem?"
  },
  {
    "type": "dialogue",
    "question": "Doctor: Your blood pressure is still higher than we'd like it to be. \nPatient: I've been trying to cut down on salt and exercise more, as you suggested. \nDoctor: ____ \nPatient: I suppose work has been quite demanding lately. I'll try to find ways to relax.",
    "choices": [
      "Are you sure you're following the diet correctly?",
      "Stress can also be a significant factor in hypertension.",
      "We might need to increase the dosage of your medication.",
      "How often do you exercise during the week?",
      "It's good to hear that you're making these lifestyle changes."
    ],
    "answer": "Stress can also be a significant factor in hypertension."
  },
  {
    "type": "dialogue",
    "question": "Colleague A: I'm struggling to get my students to participate in class discussions. \nColleague B: Have you tried using smaller group activities before opening it up to the whole class? \nColleague A: ____ \nColleague B: It usually helps because students feel less intimidated in a smaller setting.",
    "choices": [
      "No, I haven't. Do you think that would make a difference?",
      "Yes, I've tried that, but it didn't seem to work either.",
      "My students are usually very active, so I don't have that problem.",
      "I prefer to lead the discussions myself to ensure they stay on topic.",
      "What kind of group activities would you recommend for a literature class?"
    ],
    "answer": "No, I haven't. Do you think that would make a difference?"
  },
  {
    "type": "paragraph_completion",
    "question": "The concept of sustainability has become increasingly important in modern business practices. Companies are now expected to consider not only their financial performance but also their impact on the environment and society. ____ This triple bottom line approach helps businesses build long-term value while contributing to a healthier planet.",
    "choices": [
      "This is often referred to as the 'triple bottom line' of people, planet, and profit.",
      "Many companies still prioritize short-term profits over environmental concerns.",
      "Government regulations have played a minor role in this shift toward sustainability.",
      "Consumer demand for sustainable products is actually decreasing in some regions.",
      "Financial success remains the only true measure of a company's performance."
    ],
    "answer": "This is often referred to as the 'triple bottom line' of people, planet, and profit."
  },
  {
    "type": "paragraph_completion",
    "question": "Artificial intelligence is transforming the healthcare industry by providing tools for more accurate diagnoses and personalized treatments. For example, AI algorithms can analyze medical images with a precision that rivals human radiologists. ____ However, the integration of AI in healthcare also raises important ethical and privacy questions that must be addressed.",
    "choices": [
      "Furthermore, AI can help predict patient outcomes and suggest preventive measures.",
      "Medical professionals are generally resistant to the introduction of AI technology.",
      "The cost of AI implementation is currently too high for most hospitals.",
      "AI will eventually replace doctors and nurses in most clinical settings.",
      "Patients are often skeptical about the accuracy of AI-driven diagnoses."
    ],
    "answer": "Furthermore, AI can help predict patient outcomes and suggest preventive measures."
  },
  {
    "type": "paragraph_completion",
    "question": "The Great Depression was a severe worldwide economic downturn that took place mostly during the 1930s. It began after a major fall in stock prices in the United States, known as the Wall Street Crash of 1929. ____ The effects were felt globally, with unemployment rates skyrocketing and international trade plummeting.",
    "choices": [
      "This event triggered a decade of economic hardship for millions of people.",
      "The U.S. economy actually recovered quite quickly after the initial crash.",
      "Most countries were able to avoid the negative impacts of the depression.",
      "The Great Depression led to a period of unprecedented economic growth in Europe.",
      "Economists still disagree on the primary causes of the Wall Street Crash."
    ],
    "answer": "This event triggered a decade of economic hardship for millions of people."
  },
  {
    "type": "paragraph_completion",
    "question": "Urbanization is the process by which more and more people leave the countryside to live in cities. This trend is driven by various factors, including the search for better job opportunities and improved access to services. ____ However, rapid urbanization can also lead to problems such as overcrowding, pollution, and inadequate housing.",
    "choices": [
      "As a result, cities are becoming more diverse and economically vibrant.",
      "Rural areas are often more attractive to people because of the lower cost of living.",
      "The rate of urbanization is actually slowing down in most developing countries.",
      "Urban planning is not a significant factor in managing the growth of cities.",
      "Many people are now moving back to the countryside to escape urban life."
    ],
    "answer": "As a result, cities are becoming more diverse and economically vibrant."
  },
  {
    "type": "closest_meaning",
    "question": "It is essential that the experiment be conducted under strictly controlled conditions to ensure the validity of the results.",
    "choices": [
      "The experiment must be done in a very controlled environment so that the results are valid.",
      "Unless the experiment is conducted under controlled conditions, the results will definitely be invalid.",
      "The validity of the results is not guaranteed even if the experiment is strictly controlled.",
      "Strictly controlled conditions are preferred, but not essential, for the experiment's validity.",
      "The results of the experiment will be valid only if the conditions are somewhat controlled."
    ],
    "answer": "The experiment must be done in a very controlled environment so that the results are valid."
  },
  {
    "type": "closest_meaning",
    "question": "Despite the widespread use of digital technology, traditional books continue to hold a special place in the hearts of many readers.",
    "choices": [
      "Many readers still love traditional books, even though digital technology is very common.",
      "Digital technology has completely replaced traditional books for most readers today.",
      "Traditional books are more popular than digital technology because they are more sentimental.",
      "Because of digital technology, traditional books are no longer valued by most readers.",
      "Readers who use digital technology often find traditional books to be obsolete."
    ],
    "answer": "Many readers still love traditional books, even though digital technology is very common."
  },
  {
    "type": "closest_meaning",
    "question": "The new policy was so controversial that it led to a heated debate among the members of the committee.",
    "choices": [
      "The committee members argued intensely about the new policy because it was very controversial.",
      "Because the new policy was not controversial, the committee members agreed on it quickly.",
      "The committee members avoided debating the new policy despite its controversial nature.",
      "The controversy surrounding the new policy was not enough to spark a debate in the committee.",
      "The heated debate among the committee members was unrelated to the new policy's controversy."
    ],
    "answer": "The committee members argued intensely about the new policy because it was very controversial."
  },
  {
    "type": "irrelevant_sentence",
    "question": "(1) The Renaissance was a period of great cultural and artistic achievement in Europe. (2) It began in Italy in the 14th century and later spread to the rest of the continent. (3) During this time, many famous artists such as Leonardo da Vinci and Michelangelo produced their masterpieces. (4) The Industrial Revolution, on the other hand, brought about significant changes in manufacturing and technology. (5) The Renaissance also saw important advancements in science, philosophy, and exploration.",
    "choices": ["(1)", "(2)", "(3)", "(4)", "(5)"],
    "answer": "(4)"
  },
  {
    "type": "irrelevant_sentence",
    "question": "(1) Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods. (2) This process generally involves the green pigment chlorophyll and generates oxygen as a byproduct. (3) Most plants need water and carbon dioxide to perform photosynthesis effectively. (4) Animals, however, obtain their energy by consuming other organisms. (5) Without photosynthesis, there would be little oxygen in the atmosphere for life to exist.",
    "choices": ["(1)", "(2)", "(3)", "(4)", "(5)"],
    "answer": "(4)"
  },
  {
    "type": "irrelevant_sentence",
    "question": "(1) Global warming refers to the long-term rise in the average temperature of the Earth's climate system. (2) It is primarily caused by human activities such as the burning of fossil fuels and deforestation. (3) These activities release greenhouse gases into the atmosphere, which trap heat from the sun. (4) Solar energy is a renewable source of power that does not produce greenhouse gases. (5) The resulting increase in temperature has led to melting ice caps and rising sea levels.",
    "choices": ["(1)", "(2)", "(3)", "(4)", "(5)"],
    "answer": "(4)"
  },
  {
    "type": "reading_comprehension",
    "question": "According to the passage, what is the primary cause of the current mass extinction event?",
    "choices": ["Natural climate cycles", "Asteroid impacts", "Human activities", "Volcanic eruptions", "Invasive species"],
    "answer": "Human activities",
    "passage": "The concept of 'The Sixth Extinction' refers to the ongoing extinction event during the Holocene epoch, which is characterized by the rapid loss of biodiversity on Earth. Unlike previous mass extinctions, which were caused by natural phenomena like asteroid impacts or volcanic activity, the current event is primarily driven by human activities. Habitat destruction, overexploitation of species, pollution, and climate change are all contributing factors. Scientists estimate that the current extinction rate is hundreds to thousands of times higher than the natural background rate. This loss of biodiversity has profound implications for ecosystems and human well-being, as it disrupts the services that nature provides, such as pollination, water purification, and climate regulation. Efforts to mitigate this crisis include habitat restoration, protected areas, and international agreements to reduce greenhouse gas emissions."
  },
  {
    "type": "reading_comprehension",
    "question": "What does the author suggest about the current rate of extinction compared to the past?",
    "choices": ["It is slightly higher than the natural background rate.", "It is much higher than the natural background rate.", "It is lower than previous mass extinction events.", "It is difficult to estimate compared to the past.", "It is currently decreasing due to conservation efforts."],
    "answer": "It is much higher than the natural background rate.",
    "passage": "The concept of 'The Sixth Extinction' refers to the ongoing extinction event during the Holocene epoch, which is characterized by the rapid loss of biodiversity on Earth. Unlike previous mass extinctions, which were caused by natural phenomena like asteroid impacts or volcanic activity, the current event is primarily driven by human activities. Habitat destruction, overexploitation of species, pollution, and climate change are all contributing factors. Scientists estimate that the current extinction rate is hundreds to thousands of times higher than the natural background rate. This loss of biodiversity has profound implications for ecosystems and human well-being, as it disrupts the services that nature provides, such as pollination, water purification, and climate regulation. Efforts to mitigate this crisis include habitat restoration, protected areas, and international agreements to reduce greenhouse gas emissions."
  },
  {
    "type": "reading_comprehension",
    "question": "Which of the following is NOT mentioned as a factor contributing to the loss of biodiversity?",
    "choices": ["Habitat destruction", "Overexploitation of species", "Pollution", "Natural volcanic activity", "Climate change"],
    "answer": "Natural volcanic activity",
    "passage": "The concept of 'The Sixth Extinction' refers to the ongoing extinction event during the Holocene epoch, which is characterized by the rapid loss of biodiversity on Earth. Unlike previous mass extinctions, which were caused by natural phenomena like asteroid impacts or volcanic activity, the current event is primarily driven by human activities. Habitat destruction, overexploitation of species, pollution, and climate change are all contributing factors. Scientists estimate that the current extinction rate is hundreds to thousands of times higher than the natural background rate. This loss of biodiversity has profound implications for ecosystems and human well-being, as it disrupts the services that nature provides, such as pollination, water purification, and climate regulation. Efforts to mitigate this crisis include habitat restoration, protected areas, and international agreements to reduce greenhouse gas emissions."
  },
  {
    "type": "reading_comprehension",
    "question": "What was the primary goal of the Silk Road, according to the passage?",
    "choices": ["To spread religious beliefs across Eurasia.", "To facilitate the exchange of goods and ideas.", "To establish military alliances between empires.", "To discover new maritime trade routes.", "To promote the use of a single currency."],
    "answer": "To facilitate the exchange of goods and ideas.",
    "passage": "The Silk Road was an ancient network of trade routes that connected the East and West for centuries. It played a central role in the economic, cultural, and political interactions between regions such as China, India, Persia, and the Roman Empire. While the name 'Silk Road' suggests a single path, it was actually a complex web of land and sea routes. The trade of silk was a major component, but many other goods were also exchanged, including spices, precious stones, and technologies like papermaking and gunpowder. Beyond commerce, the Silk Road was a conduit for the spread of ideas, religions, and artistic styles. Buddhism, Islam, and Christianity all moved along these routes, influencing the cultures they encountered. The decline of the Silk Road began with the rise of maritime trade, which offered faster and safer alternatives for transporting goods over long distances."
  },
  {
    "type": "reading_comprehension",
    "question": "What led to the eventual decline of the Silk Road?",
    "choices": ["The collapse of the Roman Empire.", "The invention of the steam engine.", "The rise of maritime trade routes.", "The spread of the Black Death.", "Frequent wars between China and Persia."],
    "answer": "The rise of maritime trade routes.",
    "passage": "The Silk Road was an ancient network of trade routes that connected the East and West for centuries. It played a central role in the economic, cultural, and political interactions between regions such as China, India, Persia, and the Roman Empire. While the name 'Silk Road' suggests a single path, it was actually a complex web of land and sea routes. The trade of silk was a major component, but many other goods were also exchanged, including spices, precious stones, and technologies like papermaking and gunpowder. Beyond commerce, the Silk Road was a conduit for the spread of ideas, religions, and artistic styles. Buddhism, Islam, and Christianity all moved along these routes, influencing the cultures they encountered. The decline of the Silk Road began with the rise of maritime trade, which offered faster and safer alternatives for transporting goods over long distances."
  },
  {
    "type": "reading_comprehension",
    "question": "Which of the following technologies was NOT mentioned as being exchanged along the Silk Road?",
    "choices": ["Papermaking", "Gunpowder", "The compass", "Spices", "Precious stones"],
    "answer": "The compass",
    "passage": "The Silk Road was an ancient network of trade routes that connected the East and West for centuries. It played a central role in the economic, cultural, and political interactions between regions such as China, India, Persia, and the Roman Empire. While the name 'Silk Road' suggests a single path, it was actually a complex web of land and sea routes. The trade of silk was a major component, but many other goods were also exchanged, including spices, precious stones, and technologies like papermaking and gunpowder. Beyond commerce, the Silk Road was a conduit for the spread of ideas, religions, and artistic styles. Buddhism, Islam, and Christianity all moved along these routes, influencing the cultures they encountered. The decline of the Silk Road began with the rise of maritime trade, which offered faster and safer alternatives for transporting goods over long distances."
  }
]

output_data = {
    "meta": {
        "title": "Karma Mini Deneme 1",
        "subtitle": "40 Soru - 60 Dakika",
        "total_questions": 40,
        "duration_minutes": 60
    },
    "sections": [{ "id": "mixed", "label": "Karma Sorular", "from": 1, "to": 40 }],
    "passages": [],
    "questions": []
}

for i, q in enumerate(questions):
    opts = {}
    for j, c in enumerate(q["choices"]):
        opts[chr(65+j)] = c
    
    correct_letter = "A"
    for j, c in enumerate(q["choices"]):
        if c == q["answer"]:
            correct_letter = chr(65+j)
            break
            
    q_obj = {
        "id": i + 1,
        "section_id": "mixed",
        "passage_id": None,
        "question": q["question"],
        "options": opts,
        "correct": correct_letter
    }
    
    if "passage" in q:
        q_obj["question"] = q["passage"] + "\n\n" + q["question"]
        
    output_data["questions"].append(q_obj)

with open("public/exams/mini/special/karma1.json", "w", encoding="utf-8") as f:
    json.dump(output_data, f, indent=4, ensure_ascii=False)
