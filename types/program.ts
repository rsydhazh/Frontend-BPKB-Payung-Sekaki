export interface Program {
  id: number;
  name: string;           
  description: string;    
  cover_image: string;   
  is_active?: boolean;  
  schedule?: string;     
  module?: string;       
  category?: string;      
}

export interface ProgramPayload {
  name: string;
  description: string;
  cover_image: string;
  is_active?: boolean;
  schedule?: string;
  module?: string;
  category?: string;
}