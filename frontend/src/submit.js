// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore();

    const handleSubmit = async () => {
        try {
            console.log("Submitting pipeline...", { nodes, edges });
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });
            const data = await response.json();
            alert(`Pipeline parsed!\nNumber of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } catch (error) {
            console.error("Error submitting pipeline:", error);
            alert("Error submitting pipeline to backend.");
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15px'}}>
            <button 
                type="button" 
                onClick={handleSubmit}
                style={{
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    padding: '10px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
