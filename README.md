# CrimeSpot: AI-Powered Crime Reporting Platform

CrimeSpot is a modern, AI-powered crime reporting and analysis platform designed to make Chennai safer through community reporting and intelligent crime analysis.

## Features

- 🚨 Real-time crime reporting with location mapping
- 🗺️ Interactive crime heat maps
- 📊 AI-driven crime analytics dashboard
- 👥 Anonymous reporting option
- 📱 Mobile-responsive design
- 🔒 Secure data handling
- 🤖 AI-powered pattern recognition

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Leaflet for maps
- Recharts for analytics
- Axios for API calls
- Material-UI components

### Backend
- Python FastAPI
- MongoDB
- JWT Authentication
- uvicorn ASGI server

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crimespot.git
cd crimespot
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

5. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Running the Application

Use the provided development script:
```bash
run_dev.bat  # On Windows
./run_dev.sh # On Unix/Linux
```

Or run manually:

1. Start the backend server:
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## API Documentation

API documentation is available at `http://localhost:8000/docs` when the backend server is running.

## Project Structure

```
crimespot/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
├── run_dev.bat
├── run_dev.sh
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Chennai Police Department for their support
- Community contributors
- [Create React App](https://github.com/facebook/create-react-app)
- [FastAPI](https://fastapi.tiangolo.com/)

## Contact

Project Link: https://github.com/yourusername/crimespot

## Support

For support, email support@crimespot.com or join our Slack channel.

