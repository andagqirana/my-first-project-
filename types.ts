export enum FocusArea {
  CAREER = 'Career & Professional',
  HEALTH = 'Health & Fitness',
  RELATIONSHIPS = 'Relationships & Family',
  PERSONAL_GROWTH = 'Personal Growth & Learning',
  FINANCE = 'Financial Stability'
}

export interface UserFormData {
  name: string;
  primaryFocus: FocusArea | '';
  shortTermGoal: string;
  longTermGoal: string;
  dailyAvailability: string;
  biggestObstacle: string;
}

export interface RoutineItem {
  timeOfDay: string;
  activity: string;
  duration: string;
}

export interface GeneratedPlan {
  dailyRoutine: RoutineItem[];
  habitsToBuild: string[];
  actionableSteps: string[];
  motivationalQuote: string;
}

export enum AppState {
  HERO = 'HERO',
  FORM = 'FORM',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
