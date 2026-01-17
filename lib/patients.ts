// lib/patients.ts

export const PATIENTS = [
  { 
    id: '12345', 
    name: 'John Adeyemi', 
    hmo: 'Reliance HMO', 
    plan: 'Gold', 
    status: 'Active' 
  },
  { 
    id: '67890', 
    name: 'Blessing Okafor', 
    hmo: 'Hygeia HMO', 
    plan: 'Silver', 
    status: 'Active' 
  },
  { 
    id: '11111', 
    name: 'Chinedu Eze', 
    hmo: 'Avon HMO', 
    plan: 'Premium', 
    status: 'Suspended' // This one will trigger an error for demo
  },
  { 
    id: '54321', 
    name: 'Fatima Abubakar', 
    hmo: 'AXA Mansard', 
    plan: 'Basic', 
    status: 'Active' 
  }
];