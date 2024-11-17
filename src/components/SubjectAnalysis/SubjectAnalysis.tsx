import Container from '../elements/Container';
import ProgessBar from '../elements/ProgessBar';
import { getUserData } from '@/actions/getUserData';

type SubjectName = 
  | 'HTML Tools, Forms, History'
  | 'Tags & Reference in HTML'
  | 'Tables & Reference in HTML'
  | 'Tables & CSS Basics';

interface Subject {
  name: SubjectName;
  completionpercentage: number;
}

const subjectColorMap = {
  'HTML Tools, Forms, History': {
    primary: '#5E87F3',
    accent: '#EEF4FE'
  },
  'Tags & Reference in HTML': {
    primary: '#E58D49',
    accent: '#FBF3ED'
  },
  'Tables & Reference in HTML': {
    primary: '#DC5F5E',
    accent: '#FAEDEF'
  },
  'Tables & CSS Basics': {
    primary: '#76C674',
    accent: '#EEFAF1'
  }
} as const;


const SubjectAnalysis = async () => {
  const userData = await getUserData();
  const subjects = (userData?.user?.skill?.properties?.subjects || []) as Subject[];

  return (
    <Container>
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold">Subject Wise Analysis</h1>
        <div className="flex flex-col gap-6">
          {subjects.map((subject, index) => {
            const colors = subjectColorMap[subject.name];
            return (
              <ProgessBar
                key={index}
                title={subject.name}
                percentage={subject.completionpercentage}
                primaryColor={colors.primary}
                accentColor={colors.accent}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default SubjectAnalysis;