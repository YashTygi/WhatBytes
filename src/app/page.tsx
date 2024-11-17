import ComparisonGraph from "@/components/ComparisonGraph/ComparisonGraph";
import QuestionAnalysis from "@/components/QuestionAnalysis/QuestionAnalysis";
import QuickStats from "@/components/QuickStats/QuickStats";
import SkillSubject from "@/components/SkillSubject/SkillSubject";
import SubjectAnalysis from "@/components/SubjectAnalysis/SubjectAnalysis";
import { getUserData } from "@/actions/getUserData";

export default async function Home() {
  const userData = await getUserData;
  console.log(typeof userData)
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-base md:text-sm lg:text-base font-semibold text-slate-500 mb-8">Skill Test</h1>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
        <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 lg:gap-8">
          <SkillSubject  />
          <QuickStats />
          <ComparisonGraph />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 lg:gap-8">
          <SubjectAnalysis />
          <QuestionAnalysis />
        </div>
      </div>
    </div>
  );
}