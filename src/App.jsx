import HeartGallery from './components/HeartGallery'
import './App.css'

function App() {
    return (
        <div className="app">
            {/* Floating particles background */}
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <span key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 6}s`,
                        animationDuration: `${4 + Math.random() * 6}s`,
                        fontSize: `${10 + Math.random() * 20}px`,
                        opacity: 0.2 + Math.random() * 0.4
                    }}>♥</span>
                ))}
            </div>
            <HeartGallery />
        </div>
    )
}

export default App