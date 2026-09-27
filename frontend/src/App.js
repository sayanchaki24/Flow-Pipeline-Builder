import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';

function App() {
  const isDark = useStore((state) => state.isDark);

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      backgroundColor: isDark ? '#111827' : '#f8f9fa',
      color: isDark ? '#f9fafb' : '#111827',
      transition: 'all 0.3s ease'
    }}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
