import { Resume } from '../types/resume';

export interface CompletionInfo {
  score: number;
  percentage: number;
  missingFields: string[];
  sectionScores: {
    personalInfo: number;
    experience: number;
    education: number;
    skills: number;
    additional: number;
  };
}

export function calculateResumeCompletion(resume: Resume): CompletionInfo {
  let totalScore = 0;
  const missingFields: string[] = [];
  
  // Personal Information (30 points)
  const personalInfoScore = calculatePersonalInfoScore(resume.personal_info, missingFields);
  totalScore += personalInfoScore;
  
  // Experience (25 points)
  const experienceScore = calculateExperienceScore(resume.experience, missingFields);
  totalScore += experienceScore;
  
  // Education (20 points)
  const educationScore = calculateEducationScore(resume.education, missingFields);
  totalScore += educationScore;
  
  // Skills (15 points)
  const skillsScore = calculateSkillsScore(resume.skills, missingFields);
  totalScore += skillsScore;
  
  // Additional sections (10 points)
  const additionalScore = calculateAdditionalScore(resume, missingFields);
  totalScore += additionalScore;
  
  return {
    score: totalScore,
    percentage: totalScore,
    missingFields,
    sectionScores: {
      personalInfo: personalInfoScore,
      experience: experienceScore,
      education: educationScore,
      skills: skillsScore,
      additional: additionalScore
    }
  };
}

function calculatePersonalInfoScore(personalInfo: Resume['personal_info'], missingFields: string[]): number {
  let score = 0;
  
  // Full Name (5 points)
  if (personalInfo.fullName?.trim()) {
    score += 5;
  } else {
    missingFields.push('Full Name');
  }
  
  // Email (5 points)
  if (personalInfo.email?.trim() && isValidEmail(personalInfo.email)) {
    score += 5;
  } else {
    missingFields.push('Email');
  }
  
  // Phone (5 points)
  if (personalInfo.phone?.trim()) {
    score += 5;
  } else {
    missingFields.push('Phone Number');
  }
  
  // Location (5 points)
  if (personalInfo.location?.trim()) {
    score += 5;
  } else {
    missingFields.push('Location');
  }
  
  // Professional Summary (10 points, scaled)
  const summaryLength = personalInfo.summary?.trim().length || 0;
  if (summaryLength >= 50) {
    score += 10;
  } else if (summaryLength > 0) {
    score += Math.floor((summaryLength / 50) * 10);
    missingFields.push('Professional Summary (needs at least 50 characters)');
  } else {
    missingFields.push('Professional Summary');
  }
  
  return score;
}

function calculateExperienceScore(experience: Resume['experience'], missingFields: string[]): number {
  if (!experience || experience.length === 0) {
    missingFields.push('Work Experience (at least 1 entry required)');
    return 0;
  }
  
  const firstExp = experience[0];
  let score = 0;
  const expMissing: string[] = [];
  
  if (firstExp.company?.trim()) score += 5;
  else expMissing.push('company');
  
  if (firstExp.position?.trim()) score += 5;
  else expMissing.push('position');
  
  if (firstExp.location?.trim()) score += 3;
  else expMissing.push('location');
  
  if (firstExp.startDate?.trim()) score += 3;
  else expMissing.push('start date');
  
  if (firstExp.endDate?.trim() || firstExp.current) score += 3;
  else expMissing.push('end date');
  
  const descLength = firstExp.description?.trim().length || 0;
  if (descLength >= 50) {
    score += 6;
  } else if (descLength > 0) {
    score += Math.floor((descLength / 50) * 6);
    expMissing.push('longer description (50+ chars)');
  } else {
    expMissing.push('description');
  }
  
  if (expMissing.length > 0) {
    missingFields.push(`Work Experience missing: ${expMissing.join(', ')}`);
  }
  
  return score;
}

function calculateEducationScore(education: Resume['education'], missingFields: string[]): number {
  if (!education || education.length === 0) {
    missingFields.push('Education (at least 1 entry required)');
    return 0;
  }
  
  const firstEdu = education[0];
  let score = 0;
  const eduMissing: string[] = [];
  
  if (firstEdu.institution?.trim()) score += 5;
  else eduMissing.push('institution');
  
  if (firstEdu.degree?.trim()) score += 5;
  else eduMissing.push('degree');
  
  if (firstEdu.field?.trim()) score += 4;
  else eduMissing.push('field of study');
  
  if (firstEdu.location?.trim()) score += 3;
  else eduMissing.push('location');
  
  if (firstEdu.startDate?.trim() && firstEdu.endDate?.trim()) score += 3;
  else eduMissing.push('dates');
  
  if (eduMissing.length > 0) {
    missingFields.push(`Education missing: ${eduMissing.join(', ')}`);
  }
  
  return score;
}

function calculateSkillsScore(skills: Resume['skills'], missingFields: string[]): number {
  if (!skills || skills.length === 0) {
    missingFields.push('Skills (at least 1 skill category required)');
    return 0;
  }
  
  const firstSkill = skills[0];
  let score = 0;
  
  if (firstSkill.category?.trim()) {
    score += 5;
  } else {
    missingFields.push('Skill category name');
  }
  
  const itemCount = firstSkill.items?.length || 0;
  if (itemCount >= 3) {
    score += 10;
  } else if (itemCount === 2) {
    score += 7;
  } else if (itemCount === 1) {
    score += 3;
  } else {
    missingFields.push('Skills (at least 3 skills in a category)');
  }
  
  if (itemCount > 0 && itemCount < 3) {
    missingFields.push(`Skills (add ${3 - itemCount} more skill${3 - itemCount > 1 ? 's' : ''})`);
  }
  
  return score;
}

function calculateAdditionalScore(resume: Resume, missingFields: string[]): number {
  let score = 0;
  const recommendations: string[] = [];
  
  // Projects (3 points)
  if (resume.projects && resume.projects.length > 0) {
    const firstProject = resume.projects[0];
    if (firstProject.name?.trim() && 
        firstProject.description?.trim().length >= 30 && 
        firstProject.technologies?.length > 0) {
      score += 3;
    } else {
      recommendations.push('Complete project details');
    }
  } else {
    recommendations.push('Add at least 1 project');
  }
  
  // Certifications (3 points)
  if (resume.certifications && resume.certifications.length > 0) {
    const firstCert = resume.certifications[0];
    if (firstCert.name?.trim() && firstCert.issuer?.trim() && firstCert.date?.trim()) {
      score += 3;
    } else {
      recommendations.push('Complete certification details');
    }
  } else {
    recommendations.push('Add at least 1 certification');
  }
  
  // Languages (2 points)
  if (resume.languages && resume.languages.length > 0) {
    score += 2;
  } else {
    recommendations.push('Add languages');
  }
  
  // Custom Sections (2 points)
  if (resume.custom_sections && resume.custom_sections.length > 0 && 
      resume.custom_sections[0].items?.length > 0) {
    score += 2;
  } else {
    recommendations.push('Add custom sections');
  }
  
  if (recommendations.length > 0) {
    missingFields.push(`Optional (adds ${10 - score} points): ${recommendations.join(', ')}`);
  }
  
  return score;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isResumeComplete(resume: Resume): boolean {
  const completion = calculateResumeCompletion(resume);
  return completion.score >= 80;
}

export function getCompletionColor(percentage: number): string {
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 50) return 'text-yellow-600';
  return 'text-red-600';
}

export function getCompletionBgColor(percentage: number): string {
  if (percentage >= 80) return 'bg-green-100 border-green-300';
  if (percentage >= 50) return 'bg-yellow-100 border-yellow-300';
  return 'bg-red-100 border-red-300';
}
