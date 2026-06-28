const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'department_subpages.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// AIDS correct PEO data from old site
const aidsPEOContent = [
  {
    type: 'heading',
    level: 'h3',
    text: 'Program Educational Objectives (PEOs)'
  },
  {
    type: 'paragraph',
    text: 'After successful completion of the degree, the students will be able to:'
  },
  {
    type: 'list',
    items: [
      'PEO 1: Apply Artificial Intelligence and Data Science techniques with industrial standards and pioneering research to solve social and environment-related problems for making a sustainable ecosystems.',
      'PEO 2: Excel with professional skills, fundamental knowledge, and advanced futuristic technologies to become Data Scientists, Data Analyst Managers, Data Science leaders AI Research Scientists, or Entrepreneurs.'
    ]
  },
  {
    type: 'heading',
    level: 'h3',
    text: 'PROGRAM OUTCOMES (POs)'
  },
  {
    type: 'paragraph',
    text: 'Engineering Graduates will be able to:'
  },
  {
    type: 'list',
    items: [
      'Engineering knowledge: Apply knowledge of mathematics, natural science, computing, engineering fundamentals and an engineering specialization as specified in WK1 to WK4 respectively to develop to the solution of complex engineering problems.',
      'Problem Analysis: Identify, formulate, review research literature and analyse complex engineering problems reaching substantiated conclusions with consideration for Sustainable Development.',
      'Design/Development of Solutions: Design creative solutions for complex engineering problems and design/develop systems/components/processes to meet identified needs with consideration for the public health and safety, whole-life cost, net zero carbon, culture, society and environment as required.',
      'Conduct investigations of Complex Problems: Conduct investigations of complex engineering problems using research-based knowledge including design of experiments, modelling, analysis & interpretation of data to provide valid conclusions (WK8).',
      'Engineering Tool usage: Create, select and apply appropriate techniques, resources and modern engineering & IT tools, including prediction and modelling recognizing their limitations to solve complex engineering problems.',
      'The Engineer and The World: Analyze and evaluate societal and environmental aspects while solving complex engineering problems for its impact on Sustainability with reference to economy, health, safety, legal framework, culture and environment.',
      'Ethics: Apply ethical principles and commit to professional ethics, human values, diversity and inclusion; adhere to national & international laws.',
      'Individual and Collaborative Team work: Function effectively as an individual, and as a member or leader in diverse/multi-disciplinary teams.',
      'Communication: Communicate effectively and inclusively within the engineering community and society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations considering cultural, language, and learning differences.',
      'Project Management and Finance: Apply knowledge and understanding of engineering management principles and economic decision-making and apply these to ones own work, as a member and leader in a team, and to manage projects and in multidisciplinary environments.',
      'Life-Long Learning: Recognize the need for, and have the preparation and ability for i) independent and life-long learning ii) adaptability to new and emerging technologies and iii) critical thinking in the broadest context of technological change.'
    ]
  },
  {
    type: 'heading',
    level: 'h3',
    text: 'Program Specific Outcomes (PSOs)'
  },
  {
    type: 'paragraph',
    text: 'After successful completion of the degree, the students will be able to:'
  },
  {
    type: 'list',
    items: [
      'PSO 1: To apply analytic technologies to arrive at actionable foresight, Insight, hindsight from data for solving business and engineering problems.',
      'PSO 2: To create, and apply the techniques of AI and Data Science to forecast future events in the domain of Healthcare, Education, and Agriculture, Manufacturing, Automation, Robotics, Transport, etc.',
      'PSO 3: To enrich the critical thinking skills in emerging technologies such as Hybrid Mobile application development, cloud technology stack, and cyber-physical systems with mathematical aid to foresee the research findings and provide the solutions.'
    ]
  }
];

// Find the PEO key for aids
const aidsKeys = Object.keys(data.aids || {});
const peoKey = aidsKeys.find(k => k.toLowerCase().includes('peo') || k.toLowerCase().includes('po')) || 'PEOs, POs, PSOs';

data.aids[peoKey].content = aidsPEOContent;

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('AIDS PEO content updated successfully!');
console.log('Key:', peoKey);
console.log('Blocks:', aidsPEOContent.length);
