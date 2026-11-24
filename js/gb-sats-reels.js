// Ami des mots — v6.2 : les VRAIS sujets des SATs (KS2) 2025 et 2026, publiés par le Standards and Testing Agency.
// Licence : Crown copyright, réutilisation libre sous Open Government Licence v3.0 (aucun contenu tiers dans ces épreuves).
// Questions recopiées telles quelles ; seule la forme change : réponse à choisir (QCM) au lieu d'écrire dans une case.
// Réponses : celles des mark schemes officiels. Les épreuves de raisonnement (schémas) et de lecture (textes d'auteurs,
// hors licence) ne sont pas recopiées : le jeu garde leurs jumeaux.
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const ATTRIB = a => 'Contains material developed by the Standards and Testing Agency for ' + a + ' national curriculum assessments and licensed under Open Government Licence v3.0.';
  // Calcul : [question, réponse officielle, points]
  const ARITH26 = [
    ['87 + 327 =', '414', 1], ['5,555 + 555 + 55 =', '6,165', 1], ['67 ÷ 1 =', '67', 1], ['3 × 23 =', '69', 1], ['5,200 − 1,600 =', '3,600', 1],
    ['99 ÷ 9 =', '11', 1], ['? = 4,381 − 2,289', '2,092', 1], ['350 ÷ 5 =', '70', 1], ['2,004 − 10 =', '1,994', 1], ['4,030,206 = 4,000,000 + ? + 200 + 6', '30,000', 1],
    ['4/5 + 3/5 + 2/5 =', '1 4/5', 1], ['9,600 ÷ 6 =', '1,600', 1], ['48.5 + 7.392 =', '55.892', 1], ['72 ÷ 4 =', '18', 1], ['68 × 9 =', '612', 1],
    ['4/5 ÷ 9 =', '4/45', 1], ['1/2 of 250 =', '125', 1], ['? ÷ 8 = 12', '96', 1], ['9/10 − 1/5 =', '7/10', 1], ['457 × 46 = (long multiplication)', '21,022', 2],
    ['9,809 × 1,000 =', '9,809,000', 1], ['34.3 − 26.44 =', '7.86', 1], ['202.4 ÷ 100 =', '2.024', 1], ['4 × 3.78 =', '15.12', 1], ['714 ÷ 51 = (long division)', '14', 2],
    ['3/4 ÷ 3 =', '1/4', 1], ['6,715 × 54 = (long multiplication)', '362,610', 2], ['30% of 2,320 =', '696', 1], ['80 − 4³ =', '16', 1], ['97% of 400 =', '388', 1],
    ['2,176 ÷ 16 = (long division)', '136', 2], ['1 3/4 + 1 5/8 =', '3 3/8', 1], ['0.09 × 24 =', '2.16', 1], ['65% of 680 =', '442', 1], ['3 1/4 − 2 4/5 =', '9/20', 1], ['2 1/2 × 70 =', '175', 1]];
  const ARITH25 = [
    ['7,549 = 7,000 + ? + 40 + 9', '500', 1], ['456 − 385 =', '71', 1], ['? × 233 = 0', '0', 1], ['47.65 + 51.783 =', '99.433', 1], ['904 − 8 =', '896', 1],
    ['84 ÷ 12 =', '7', 1], ['832 × 6 =', '4,992', 1], ['12 × 3 × 10 =', '360', 1], ['326 + ? = 380', '54', 1], ['72 ÷ ? = 9', '8', 1],
    ['2/5 × 5/6 =', '10/30', 1], ['540 ÷ 6 =', '90', 1], ['807 × 8 =', '6,456', 1], ['614 × 32 = (long multiplication)', '19,648', 2], ['2,000 ÷ 4 =', '500', 1],
    ['3 × 8.9 =', '26.7', 1], ['326.8 ÷ 10 =', '32.68', 1], ['1/3 − 1/9 =', '2/9', 1], ['896 ÷ 7 =', '128', 1], ['1,004,235 − 52,346 =', '951,889', 1],
    ['4,104 ÷ 9 =', '456', 1], ['1/6 + 2/3 + 3/12 =', '1 1/12', 1], ['17 − 3.6 =', '13.4', 1], ['2 3/5 + 1 3/5 =', '4 1/5', 1], ['5% of 860 =', '43', 1],
    ['5/8 ÷ 3 =', '5/24', 1], ['19% of 2,300 =', '437', 1], ['884 ÷ 17 = (long division)', '52', 2], ['2 1/6 + 2/5 =', '2 17/30', 1], ['6,419 × 74 = (long multiplication)', '475,006', 2],
    ['(5² + 3) − 12 ÷ 4 =', '25', 1], ['65% of 540 =', '351', 1], ['3 1/3 × 12 =', '40', 1], ['8,190 ÷ 45 = (long division)', '182', 2], ['3/8 × 240 =', '90', 1], ['4 3/7 − 1 1/6 =', '3 11/42', 1]];
  // Grammaire : [consigne et phrase, bonne réponse, [autres choix], explication, points]
  const GPS26 = [
    ['Which sentence must end with a question mark?', 'Will Orla buy tickets for all of us', ['Orla wants to know when you are coming to the cinema with us', 'I will ask Mum if I can come today', 'I need to find out what time the film starts'], 'A direct question asks something; the others only report or state.'],
    ['Which sentence is the most formal?', 'Please be seated.', ['Come on – find a seat!', 'Sit down, won’t you?', 'Have a sit-down.'], 'Formal: polite, impersonal, no chatty expressions.'],
    ['Match the word to the correct suffix: develop + ?', 'ment', ['ness', 'less', 'ous'], 'develop → development (also: outrageous, weakness, powerless).'],
    ['Which sentence is punctuated correctly?', 'Flo – my youngest sister – is in year three.', ['Flo – my youngest – sister is in year three.', 'Flo my youngest – sister – is in year three.', 'Flo my youngest sister – is in year – three.'], 'The pair of dashes goes around the extra information: my youngest sister.'],
    ['Which sentence uses a colon correctly?', 'Plants cannot live without these three things: light, water and nutrients.', ['Plants cannot live without: these three things light, water and nutrients.', 'Plants cannot live: without these three things light, water and nutrients.', 'Plants cannot live without these: three things light, water and nutrients.'], 'A colon comes after a complete clause, before the list.'],
    ['Which sentence is not written in Standard English?', 'I am not as good at them tricks as Jay is.', ['We were all at the skate park yesterday evening.', 'Jay did a brilliant trick on his skateboard.', 'Jay said he would show me how to improve.'], 'Standard English: “those tricks”, not “them tricks”.'],
    ['Which sentence is punctuated correctly?', 'Look at that horse!', ['We saw horses from the train window?', 'What a lovely sight it was?', 'Where are the horses.'], 'Commands/exclamations can take !; questions need ?'],
    ['Which word is a synonym of “apparent”? “It was apparent that Yasir had worked hard on his model.”', 'obvious', ['curious', 'surprising', 'exciting'], 'Apparent = clear, obvious.'],
    ['Which sentence uses a comma correctly after a fronted adverbial?', 'According to the weather forecast, it will be sunny this afternoon.', ['Whatever, the cost she was determined that she would own a horse one day.', 'Unfortunately he overslept and, missed the school trip to the Science Museum.', 'This is a new game that we learnt, in PE today.'], 'The comma comes right after the fronted adverbial.'],
    ['Which word is a synonym of “vast”?', 'enormous', ['nasty', 'small', 'pleasant'], 'vast–enormous, tiny–small, unpleasant–nasty, agreeable–pleasant.'],
    ['Choose the more formal option: “We are writing to ask / request that you…”', 'request', ['ask'], 'Formal pairs: request, consider, proceeds, purchase.'],
    ['Where do the brackets go? “Pepper a black cat from York hid in the back of his owner’s car for a whole night.”', 'Pepper (a black cat from York) hid…', ['(Pepper a black cat) from York hid…', 'Pepper a black cat (from York hid)…', 'Pepper a black cat from York (hid in the back)…'], 'Brackets go around the extra information about Pepper.'],
    ['Which verb is in the wrong tense? “When you use watercolour paints, it is important that you begin with lighter shades and built up colour gradually.”', 'built', ['use', 'is', 'begin'], 'It should be “build up”, in the present like the other verbs.'],
    ['Where does the pair of commas go? “She decided although she was feeling tired that she would still go to Rita’s party.”', 'She decided, although she was feeling tired, that she would still go…', ['She, decided although she was feeling tired that, she would still go…', 'She decided although, she was feeling tired that, she would still go…', 'She decided although she was, feeling tired that she would, still go…'], 'The commas go around the subordinate clause.'],
    ['“You cannot borrow books from the local library unless you are a member.” What is “unless you are a member”?', 'a subordinate clause', ['a preposition phrase', 'a main clause', 'a noun phrase'], 'It starts with the subordinating conjunction “unless” and cannot stand alone.'],
    ['“How I hate tidying my bedroom” is…', 'an exclamation', ['a statement', 'a command'], 'Exclamations often start with “How” or “What”.'],
    ['Which word is the conjunction? “Salma decided to cook dinner while her mum enjoyed a rest after a tiring day at work.”', 'while', ['after', 'decided', 'tiring'], '“While” joins two clauses.'],
    ['Which sentence uses the past progressive?', 'What were you doing?', ['What did you do?', 'What are you doing?', 'What could you have done?'], 'Past progressive = were + -ing.'],
    ['Which prefix makes the antonym of “loyal”?', 'dis', ['im', 'in', 'de'], 'imperfect, indirect, disloyal, deconstruct.'],
    ['Which option completes “___ before school.” in the past perfect?', 'I had eaten breakfast', ['I eat breakfast', 'I was eating breakfast', 'I have eaten breakfast'], 'Past perfect = had + past participle.'],
    ['Which three words are the verbs? “Jackson waited for everyone else to choose their food before he served himself.”', 'waited, choose, served', ['everyone, food, himself', 'waited, food, before', 'choose, their, he'], 'Verbs: waited, choose, served.'],
    ['Which relative pronoun completes it? “The gymnast, ___ has represented his country at the Olympics, will visit our sports club next week.”', 'who', ['which', 'whose', 'what'], '“Who” for a person.'],
    ['Where do the inverted commas go?', 'Imran looked up from the microscope. “I can see the bacteria really clearly!” he exclaimed.', ['“Imran looked up from the microscope. I can see the bacteria really clearly!” he exclaimed.', 'Imran looked up from the microscope. “I can see the bacteria really clearly! he exclaimed.”', 'Imran looked up “from the microscope. I can see the bacteria” really clearly! he exclaimed.'], 'Only the spoken words go inside.'],
    ['Rewrite in the simple past: “The plane flies high above the clouds, while the passengers sit in their seats and relax.”', 'flew … sat … relaxed', ['flown … sitted … relaxed', 'was flying … sat … relax', 'flies … sat … relaxed'], 'fly → flew, sit → sat, relax → relaxed.'],
    ['What is the relative clause? “One of the greatest inventions was the wheel, which first appeared over 5000 years ago.”', 'which first appeared over 5000 years ago', ['One of the greatest inventions', 'was the wheel', 'over 5000 years ago'], 'A relative clause starts with a relative pronoun (which).'],
    ['Where does the semi-colon go? “The lovely county of Cornwall has a long, rugged coastline its secluded coves provide safe, sheltered harbours.”', 'after “coastline”', ['after “Cornwall”', 'after “coves”', 'after “safe”'], 'Between two main clauses: …coastline; its secluded coves…'],
    ['Contracted form of “does not” in “she does not own a computer”?', 'doesn’t', ['dosen’t', 'does’nt', 'don’t'], 'The apostrophe replaces the missing o: doesn’t.'],
    ['Which word is a preposition? “The bridge over the stream was broken so we had to paddle across.”', 'over', ['bridge', 'broken', 'so'], '“over the stream” is a preposition phrase.'],
    ['Where does the dash go? “My fruit salad will include strawberries, blueberries and grapes they’re so delicious.”', 'after “grapes”', ['after “salad”', 'after “include”', 'after “so”'], '…and grapes – they’re so delicious.'],
    ['Same word family as “motivated”: “Her ___ was the chance to swim for her county.”', 'motivation', ['motivate', 'motivating', 'motivated'], 'A noun is needed: motivation.'],
    ['In which sentence is “right” an adjective?', 'Rani wanted to make the right decision.', ['We went right to the top of the tower.', 'You have the right to fair treatment.', 'Kyle tried to right his mistakes.'], '“right” describes the noun “decision”.'],
    ['Where do the two apostrophes go?', 'Tom’s one of those boys who’s always happy to help.', ['Toms one of those boy’s who’s always happy to help.', 'Tom’s one of those boys’ whos always happy to help.', 'Toms’ one of those boys whos’ always happy to help.'], 'Tom’s = Tom is; who’s = who is.'],
    ['Which is the subordinating conjunction? “Unfortunately, the youth club will be closed until we have completed the repairs and replaced the sports equipment.”', 'until', ['and', 'Unfortunately', 'closed'], '“and” is co-ordinating; “until” is subordinating.'],
    ['Where does the hyphen go? “…so we bought a ready made pasta sauce and garlic bread.”', 'ready-made', ['pasta-sauce', 'garlic-bread', 'made-pasta'], '“ready-made” is a compound adjective.'],
    ['Which question asks what time the game starts, punctuated correctly?', 'What time does the game start?', ['What time does the game start.', 'what time does the game start?', 'I wonder what time the game starts?'], 'Capital letter, question word, question mark.'],
    ['“When Seema reached the playground, she greeted her friends.” What is “her friends”?', 'the object', ['the subject', 'the verb', 'a conjunction'], '“she” is the subject of “greeted”; “her friends” is the object.'],
    ['Which three words are nouns? “They were so excited about going to Cardiff that they wouldn’t let the bad weather dampen their enthusiasm.”', 'Cardiff, weather, enthusiasm', ['excited, bad, dampen', 'They, they, their', 'going, let, dampen'], 'Nouns name places, things and ideas.'],
    ['Rewrite in the active: “The trees are being harmed by pollution.”', 'Pollution is harming the trees.', ['The trees harm pollution.', 'Pollution was harmed by the trees.', 'The trees are harming pollution.'], 'The doer (pollution) becomes the subject.'],
    ['Which is the possessive pronoun? “…She had forgotten to bring a pen so I gave her one of mine.”', 'mine', ['her', 'She', 'one'], '“mine” stands alone for “my pen”.'],
    ['What is the longest noun phrase? “The beautiful grey elephants walked slowly through the forest.”', 'The beautiful grey elephants', ['the forest', 'walked slowly', 'grey elephants'], 'Determiner + adjectives + noun.'],
    ['Which sentence uses the subjunctive?', 'If I were to look inside the box, what would I find?', ['If I had to choose my favourite food, I would choose pizza.', 'If your soup is too hot, wait for it to cool down.', 'If you are late, you might miss the bus.'], '“If I were…” is the subjunctive.'],
    ['Rewrite in the passive: “Rabia broke the mug.”', 'The mug was broken by Rabia.', ['Rabia was broken by the mug.', 'The mug broke Rabia.', 'Rabia has broken the mug.'], 'Object first + was + past participle.'],
    ['What is the adverbial? “I’m going to visit my uncle at the weekend.”', 'at the weekend', ['my uncle', 'to visit', 'I’m going'], 'It tells us WHEN.'],
    ['Which sentence is an exclamation? (punctuation removed)', 'What a brilliant song this is', ['That’s my favourite band', 'This music is too loud', 'Let’s dance'], 'Exclamations start with “What” or “How” + a full sentence.'],
    ['Which two words are co-ordinating conjunctions? “Because my brother couldn’t decide whether to wear trainers or boots, we left late and almost missed the bus.”', 'or, and', ['Because, whether', 'Because, and', 'whether, or'], 'FANBOYS: for, and, nor, but, or, yet, so.'],
    ['Which two words are adverbs? “I’ll always remember the day that we won the cup. Dad and I sang jubilantly as we walked through the park.”', 'always, jubilantly', ['remember, sang', 'day, cup', 'that, as'], 'Adverbs tell us how/when.'],
    ['Which three words are determiners? “I go to the swimming pool every week with my best friend Peter.”', 'the, every, my', ['go, with, best', 'pool, week, friend', 'I, to, Peter'], 'Determiners come before a noun.']];
  const GPS25 = [
    ['What does the prefix anti- mean in the word anticlockwise?', 'opposite', ['never', 'before', 'without'], 'anti- = against/opposite.'],
    ['Which word is a synonym of “bumpy”?', 'uneven', ['sore', 'smooth', 'low'], 'Smooth is the antonym!'],
    ['Where is the question mark needed? “Have you finished eating your lunch” asked Hannah', 'after “lunch”, inside the inverted commas', ['after “Hannah”', 'after “Have”', 'after “eating”'], '“Have you finished eating your lunch?” asked Hannah.'],
    ['“Watch where you’re going.” is…', 'a command', ['a statement'], 'It tells someone to do something.'],
    ['Where do the two commas go? “We lifted up the log and found worms woodlice snails and slugs.”', 'after “worms” and after “woodlice”', ['after “log” and after “found”', 'after “worms” and after “snails”', 'after “woodlice” and after “and”'], 'Commas separate items in a list (not before “and” here).'],
    ['Which punctuation mark could end “I can’t wait to look after the school rabbit for the weekend”?', 'an exclamation mark', ['a question mark', 'a comma', 'a colon'], 'It shows excitement.'],
    ['Standard English: “We was / were going on a school trip to a concert.”', 'were', ['was'], 'We were.'],
    ['Where does the semi-colon go? “We have been learning about the Vikings they were a fascinating civilisation.”', 'after “Vikings”', ['after “learning”', 'after “were”', 'after “fascinating”'], 'Between two main clauses.'],
    ['Which sentence must end with a question mark?', 'Is Jay going to come on Tuesday', ['How good it would be if Jay could come', 'Jay asked if we could meet him on Tuesday'], 'Also “Do you know if Jay is coming on Tuesday?” is a question.'],
    ['Where do the brackets go? “Our class visited a castle the oldest in the country to help us with our history project.”', 'around “the oldest in the country”', ['around “a castle”', 'around “our history project”', 'around “to help us”'], 'Brackets go around extra information.'],
    ['Most formal: “The basketball club was set up / established by a group of friends last year.”', 'established', ['set up'], 'Formal pairs: established, invited, compete.'],
    ['Which sentence starts with an adverbial?', 'After dinner, Kal is going to her room.', ['She is feeling tired, so Kal is going to her room.', 'Arun told me that Kal is going to her room.', 'I wonder when Kal is going to her room.'], '“After dinner” tells us when.'],
    ['Which sentence is the most formal?', 'The coach has yet to announce the team.', ['I can’t wait for the game tomorrow!', 'Kick-off is at 2pm.', 'I really hope I’ll be playing!'], '“has yet to announce” is formal vocabulary.'],
    ['What could be used instead of brackets? “Tokyo (the capital of Japan) is one of the largest cities in the world.”', 'dashes', ['hyphens', 'colons', 'semi-colons'], 'Brackets, dashes or commas mark parenthesis.'],
    ['Where does the colon go? “We saw various animals on our evening walk badgers, foxes, mice and an owl.”', 'after “walk”', ['after “saw”', 'after “animals”', 'after “badgers”'], 'Complete clause, then colon, then the list.'],
    ['Which three words are adjectives? “The crumbling castle stood high on the rocky hill. The views over the countryside were glorious.”', 'crumbling, rocky, glorious', ['castle, hill, views', 'stood, were, over', 'high, over, countryside'], 'Adjectives describe nouns.'],
    ['Which sentence is punctuated correctly?', 'Swimming, which strengthens muscles in the arms and legs, is great exercise.', ['Swimming, which strengthens muscles in the arms, and legs is great exercise.', 'Swimming which strengthens muscles, in the arms and legs, is great exercise.', 'Swimming which strengthens, muscles in the arms and legs, is great exercise.'], 'Commas go around the relative clause.'],
    ['Complete with a relative clause: “My uncle, ___, is going to plant potatoes.” (My uncle lives on a farm.)', 'who lives on a farm', ['he lives on a farm', 'which lives on a farm', 'lives on a farm'], 'Relative pronoun “who” for a person.'],
    ['In which sentence is “space” a verb?', 'Space yourselves out in the hall for PE.', ['Make space on the table for the laptop.', 'Our new playground has more space for lining up.', 'Space is an interesting science topic.'], 'It is the action you are told to do.'],
    ['Which suffix turns “class” into another word?', 'ify', ['ate', 'ise', 'ment'], 'recruitment, advertise, classify, alienate.'],
    ['Why is there an apostrophe in “Who’s been eating my ice cream?”', 'to show that who’s is the contracted form of “who has”', ['to show that who’s is the contracted form of “who is”', 'to show singular possession', 'to show plural possession'], '“Who has been eating…”'],
    ['Which sentence uses a comma after a fronted adverbial?', 'When the waitress came over, I asked which flavours were the most popular.', ['We studied the menu at the noisy, crowded ice cream parlour.', 'I chose chocolate, Mum chose strawberry and Dad chose vanilla.', 'My ice cream was covered in nuts, chocolate chips and toffee sauce.'], '“When the waitress came over” comes first, then a comma.'],
    ['Where does the dash go? “I must repair my backpack the zip is broken and I need it for our camping trip.”', 'after “backpack”', ['after “repair”', 'after “broken”', 'after “need”'], '…my backpack – the zip is broken…'],
    ['“Are you coming to the film night at school” is…', 'a question', ['a command', 'a statement', 'an exclamation'], 'question, exclamation, command, statement.'],
    ['Which sentence has a modal verb?', 'I must be at school early tomorrow.', ['Please help me find the blue pencils.', 'What are we having for lunch?', 'Alex had been yawning all day.'], '“must” is a modal verb.'],
    ['Why is “they” unclear in “When Kate and Ravi met the other tennis players, they were excited.”?', 'we cannot tell if “they” means Kate and Ravi or the other players', ['“they” should be “them”', 'there are too many commas', 'tennis players cannot be excited'], 'Ambiguous pronoun.'],
    ['Which prefix can go before charge, cycle and cover?', 're', ['un', 'dis', 'pre'], 'recharge, recycle, recover.'],
    ['Where does the hyphen go? “…we enjoyed dressing up in the old fashioned costumes and fancy hats.”', 'old-fashioned', ['dressing-up', 'fancy-hats', 'fashioned-costumes'], 'Compound adjective.'],
    ['Where do the inverted commas go?', '“I think it is over here!” shouted Reena, pointing at the map. “Follow me!”', ['“I think it is over here! shouted Reena,” pointing at the map. Follow me!', 'I think it is “over here!” shouted Reena, pointing at the map. Follow “me!”', '“I think it is over here!” “shouted Reena, pointing at the map.” Follow me!'], 'Only Reena’s words go inside.'],
    ['“The folded letter was put in the envelope.” “folded” is…', 'an adjective', ['a verb', 'a noun'], 'It describes the letter. (He folds = verb; had folds = noun.)'],
    ['What is the relative clause? “After her dance class, Jamila has a strawberry milkshake, which she buys from the local cafe.”', 'which she buys from the local cafe', ['After her dance class', 'Jamila has a strawberry milkshake', 'a strawberry milkshake'], 'Starts with “which”.'],
    ['Which word is the preposition? “Stef trained hard before the hockey tournament.”', 'before', ['trained', 'hard', 'hockey'], '“before the hockey tournament”.'],
    ['What is the subject? “After the heavy rain, Mum decided not to water the garden.”', 'Mum', ['the heavy rain', 'the garden', 'water'], 'Mum is the one who decided.'],
    ['Rewrite in the passive: “Someone stole the treasure.”', 'The treasure was stolen.', ['The treasure stole someone.', 'Someone was stolen by the treasure.', 'The treasure has been stealing.'], 'Object first + was + past participle.'],
    ['Simple past: “I ___ my violin to school. I ___ it last week.” (to bring / to forget)', 'brought … forgot', ['bringed … forgetted', 'brang … forgot', 'brought … forget'], 'Irregular verbs: brought, forgot.'],
    ['Which three words are nouns? “He played the piano with great confidence and rarely made mistakes.”', 'piano, confidence, mistakes', ['played, made, rarely', 'great, rarely, with', 'He, the, and'], 'Nouns: things and ideas.'],
    ['“On sunny days, Ben often plays outside before dinner.” What is “often”?', 'an adverb', ['a conjunction', 'an adjective', 'a determiner'], 'It tells us how often he plays.'],
    ['Rewrite in the active: “The local park is maintained by the council.”', 'The council maintains the local park.', ['The local park maintains the council.', 'The council is maintained by the park.', 'The park was maintaining the council.'], 'The doer becomes the subject.'],
    ['Which is the possessive pronoun? “Tennis is Karen’s favourite sport and mine is football.”', 'mine', ['Karen’s', 'is', 'favourite'], '“mine” = my favourite sport.'],
    ['Which verb is in the subjunctive? “If I were to help, I would start by clearing the tables.”', 'were', ['would', 'start', 'help'], '“If I were…”'],
    ['Which three words are determiners? “There are some biscuits in this tin but there are not any chocolate ones.”', 'some, this, any', ['biscuits, tin, ones', 'There, but, not', 'are, in, chocolate'], 'Determiners come before nouns.'],
    ['Past progressive of “to talk”: “While we ___ to our friend, his phone started ringing.”', 'were talking', ['talked', 'have talked', 'had talked'], 'was/were + -ing.'],
    ['Which word is the adverb? “Although Jane was a speedy runner, she was almost beaten in the race.”', 'almost', ['speedy', 'Although', 'beaten'], '“almost” modifies “beaten”.'],
    ['Past perfect of “to decide”: “The teacher told the class that he ___ not to give them any homework.”', 'had decided', ['decided', 'has decided', 'was deciding'], 'had + past participle.']];
  // Dictée : [phrase avec trou, mot, [fautes courantes]]
  const SPELL26 = [
    ['I did a ___ sketch before starting my painting.', 'rough', ['ruff', 'rouff', 'rugh']], ['The complicated map caused a lot of ___.', 'confusion', ['confution', 'confushion', 'confussion']],
    ['We used plain ___ to make bread.', 'flour', ['flower', 'flowr', 'flor']], ['The joke was so funny that it was ___ not to laugh.', 'impossible', ['imposible', 'impossable', 'inpossible']],
    ['It would be my ___ to help you.', 'pleasure', ['plesure', 'pleasur', 'pleazure']], ['The water in the lake was ___ clear.', 'crystal', ['cristal', 'crystle', 'chrystal']],
    ['Athletes sometimes train on running ___.', 'machines', ['mashines', 'machiens', 'masheens']], ['The goalkeeper defended her goal ___ during the match.', 'confidently', ['confidentally', 'confidantly', 'confidentley']],
    ['I’ve been ___ a jumper.', 'knitting', ['nitting', 'kniting', 'knittin']], ['The second experiment ___ from the first.', 'differed', ['diffured', 'differred', 'diferred']],
    ['The afternoon ___ will start at 2 o’clock.', 'session', ['sesion', 'sesshun', 'cession']], ['The silver necklace was a priceless ___.', 'antique', ['antik', 'antique’s', 'anteek']],
    ['I will ___ go to the museum on Saturday.', 'probably', ['probly', 'probabley', 'probebly']], ['The cat was ___ of the new food.', 'suspicious', ['suspisious', 'suspicous', 'suspitious']],
    ['The guide showed us around the ___ dining room.', 'elegant', ['eligant', 'elegent', 'elagant']], ['My football coach says that I have a lot of ___.', 'potential', ['potencial', 'potenshal', 'potentiel']],
    ['The ___ was strict but fair.', 'examiner', ['examinner', 'exsaminer', 'examinor']], ['The children were asked to be quiet during ___.', 'registration', ['registrasion', 'regestration', 'registracion']],
    ['The broken pavement was quite ___.', 'hazardous', ['hazardus', 'hazzardous', 'hazerdous']], ['Bats are ___ animals.', 'fascinating', ['facinating', 'fasinating', 'fascinateing']]];
  const SPELL25 = [
    ['There was a brave ___ in the story.', 'knight', ['night', 'knite', 'nite']], ['The children walked home ___ the park.', 'through', ['threw', 'thru', 'throught']],
    ['We were ___ for our hard work.', 'rewarded', ['rewordid', 'rewarted', 'reworded']], ['I enjoy reading ___ stories.', 'adventure', ['adventcher', 'adventur', 'advencher']],
    ['After a few days, the seeds ___ shoots.', 'developed', ['developped', 'devoloped', 'develloped']], ['There was an ___ of colour during the firework display.', 'explosion', ['explotion', 'explosian', 'exploshun']],
    ['They ___ a bridge on their way to school.', 'passed', ['past', 'parsed', 'pased']], ['There was a funny ___ in the school play.', 'scene', ['seen', 'sene', 'scean']],
    ['The new phone is lightweight and ___.', 'affordable', ['affordible', 'afordable', 'affordeble']], ['It was a good ___ to move to a quieter room.', 'suggestion', ['sugestion', 'suggesion', 'suggestian']],
    ['My sister stomped ___ up the stairs.', 'angrily', ['angryly', 'angerly', 'angrilly']], ['There was an ___ to the bus timetable.', 'alteration', ['altaration', 'alterasion', 'alturation']],
    ['Cold environments are the preferred habitats for ___.', 'reindeer', ['raindeer', 'reindear', 'reign deer']], ['I am looking forward to going on a ___ trip next year.', 'residential', ['residencial', 'residenshal', 'resedential']],
    ['The ship was held in place by an ___.', 'anchor', ['ancor', 'anker', 'anchore']], ['Brushing your teeth helps to remove ___.', 'plaque', ['plack', 'plak', 'plaque’s']],
    ['I hid my ___ when my friend won the contest.', 'jealousy', ['jelousy', 'jealosy', 'jealousey']], ['The plants will ___ on the sunny windowsill.', 'flourish', ['florish', 'flourrish', 'flurish']],
    ['Ava was ___ to miss the school trip.', 'disappointed', ['dissappointed', 'disapointed', 'dissapointed']], ['I look forward to ___ your reply.', 'receiving', ['recieving', 'receeving', 'receiveing']]];
  // Mauvaises réponses de calcul : erreurs typiques (virgule décalée, retenue oubliée, mauvaise opération…).
  const VANNES = ['Plumo checked with his calculator feather: no.', 'Close, but the examiner wants the exact number.', 'A carrying slip-up! The digits went for a wander.', 'The decimal point moved house without telling anyone.', 'Nice try. Plumo saw the trap and you walked right in. 😏'];
  function fauxCalcul(rep, r){
    const out = [], ajoute = (x, v) => { if(x && x !== rep && !out.some(o => o[0] === x)) out.push([x, v]); };
    const fr = rep.match(/^(?:(\d+) )?(\d+)\/(\d+)$/);
    if(fr){ const e = fr[1] ? +fr[1] : 0, n = +fr[2], d = +fr[3], txt = (a, b, c) => (a ? a + ' ' : '') + b + '/' + c;
      ajoute(txt(e, n + 1, d), 'One part too many. Count the parts again!'); ajoute(txt(e, d, n), 'Upside down! The bottom number is the denominator.'); ajoute(txt(e ? e + 1 : 1, n, d), 'An extra whole sneaked in.'); ajoute(txt(e, n, d * 2), 'The denominator doubled for no reason.');
      return out.slice(0, 3); }
    const v = parseFloat(rep.replace(/,/g, '')), dec = (rep.split('.')[1] || '').length, u = dec ? Math.pow(10, -dec) : 1;
    const f = x => { const [a, b] = Math.abs(x).toFixed(dec).split('.'); return (x < 0 ? '−' : '') + Number(a).toLocaleString('en-GB') + (b ? '.' + b : ''); };
    const hasard = () => VANNES[Math.floor(r() * VANNES.length)];
    if(v){ ajoute(f(v * 10), 'Ten times too big. The decimal point went on holiday.'); ajoute(f(v / 10), 'Ten times too small. A zero escaped!'); }
    ajoute(f(v + u), hasard()); ajoute(f(v + (v >= 1000 ? 100 : 10 * u)), 'A carrying slip-up! The digits went for a wander.'); ajoute(f(v - u), hasard());
    if(!v){ ajoute('1', 'Anything times 0 is 0. Zero is greedy.'); }
    // Un mélange : une « réponse » hors-sujet de temps en temps, mais toujours 3 choix.
    const l = out.slice(); for(let i = l.length - 1; i > 0; i--){ const k = Math.floor(r() * (i + 1)); [l[i], l[k]] = [l[k], l[i]]; }
    return l.slice(0, 3);
  }
  const GRAM = ['Plumo checked his grammar book: not that one.', 'Close! But the examiner would take the mark back.', 'That one looks right from far away. Up close, no.', 'Nice try! Read the sentence out loud and listen.'];
  const ORTHO = ['Plumo read it out loud: it does not look like that. 😏', 'A letter is missing (or one too many came to the party).', 'That is how it sounds, not how it is spelt.'];
  function liste(id, graine){
    const R = E.REELS[id]; if(!R) return [];
    const r = E.hasard(graine || 1), q = [];
    for(const [i, x] of R.items.entries()){
      if(R.sorte === 'arith') q.push({ id:id + ':' + i, chap:'reel', matiere:'gb-maths', lang:'en', consigne:'🔢 ' + R.titre + ' · Question ' + (i + 1), enonce:x[0], bon:x[1], pts:x[2],
        faux:fauxCalcul(x[1], r).map(([en, vanne]) => ({ en, vanne })), regle:'Official answer (STA mark scheme): ' + x[1] + '.' });
      else if(R.sorte === 'gps') q.push({ id:id + ':' + i, chap:'reel', matiere:'gb-english', lang:'en', consigne:'✏️ ' + R.titre + ' · Question ' + (i + 1), enonce:x[0], bon:x[1], pts:1,
        faux:x[2].map(f => ({ en:f, vanne:GRAM[Math.floor(r() * GRAM.length)] })), regle:x[3] });
      else q.push({ id:id + ':' + i, chap:'reel', matiere:'gb-english', lang:'en', consigne:'🔊 ' + R.titre + ' · Spelling ' + (i + 1), enonce:x[0], bon:x[1], pts:1, ecoute:x[0].replace('___', x[1]),
        faux:x[2].map(f => ({ en:f, vanne:ORTHO[Math.floor(r() * ORTHO.length)] })), regle:'The word is “' + x[1] + '”. ' + x[0].replace('___', x[1]) });
    }
    return q;
  }
  E.REELS = {
    'sats26-arith':{ titre:'SATs 2026 · Maths Paper 1: arithmetic', sorte:'arith', annee:2026, items:ARITH26, attrib:ATTRIB(2026) },
    'sats25-arith':{ titre:'SATs 2025 · Maths Paper 1: arithmetic', sorte:'arith', annee:2025, items:ARITH25, attrib:ATTRIB(2025) },
    'sats26-gps':{ titre:'SATs 2026 · Grammar & punctuation Paper 1', sorte:'gps', annee:2026, items:GPS26, attrib:ATTRIB(2026) },
    'sats25-gps':{ titre:'SATs 2025 · Grammar & punctuation Paper 1', sorte:'gps', annee:2025, items:GPS25, attrib:ATTRIB(2025) },
    'sats26-spell':{ titre:'SATs 2026 · Spelling', sorte:'spell', annee:2026, items:SPELL26, attrib:ATTRIB(2026) },
    'sats25-spell':{ titre:'SATs 2025 · Spelling', sorte:'spell', annee:2025, items:SPELL25, attrib:ATTRIB(2025) }
  };
  E.listeReelle = liste;
  E.LICENCE_OGL = 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/';
  // Les vrais SATs, jouables comme examens blancs : vrai calcul + raisonnement jumeau ; vraie grammaire + vraie dictée.
  const P = (titre, duree, points, reel, autre) => Object.assign({ titre, duree, points, reel, matiere:'gb-maths', chapitres:[], n:0, niveau:'Y6' }, autre || {});
  for(const a of [2026, 2025]){ const k = String(a).slice(2), s = { 2026:{ m:56, g:34 }, 2025:{ m:58, g:35 } }[a];
    E.EXAMENS['sats' + k + '-reel-maths'] = { titre:'KS2 SATs ' + a + ' · Maths (real paper)', ic:'🔢', niveau:'Y6', note:'sats', seuil:s.m / 110, reel:true, annee:a, papers:[
      P('Paper 1: arithmetic (real ' + a + ' questions)', '30 min', 40, 'sats' + k + '-arith'),
      P('Paper 2: reasoning (twin paper)', '40 min', 35, null, { chapitres:['ratio-ks2', 'angles', 'area', 'statistics-basic', 'fdp'], n:10 }),
      P('Paper 3: reasoning (twin paper)', '40 min', 35, null, { chapitres:['ratio-ks2', 'angles', 'area', 'statistics-basic', 'place-value'], n:10 })] };
    E.EXAMENS['sats' + k + '-reel-gps'] = { titre:'KS2 SATs ' + a + ' · Grammar, punctuation & spelling (real paper)', ic:'✏️', niveau:'Y6', note:'sats', seuil:s.g / 70, reel:true, annee:a, papers:[
      P('Paper 1: questions (real ' + a + ' questions)', '45 min', 50, 'sats' + k + '-gps', { matiere:'gb-english' }),
      P('Paper 2: spelling (real ' + a + ' words, read aloud)', 'about 15 min', 20, 'sats' + k + '-spell', { matiere:'gb-english' })] }; }
})();
