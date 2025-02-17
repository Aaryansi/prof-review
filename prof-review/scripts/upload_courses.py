import firebase_admin
from firebase_admin import credentials, firestore

# Load Firebase credentials (ensure serviceAccountKey.json is in prof-review/)
cred = credentials.Certificate("../serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Firestore database instance
db = firestore.client()

# Biology (BIO) Courses
engd_courses = [
    {"code": "ENGD 100", "name": "Design and Communication Studio"},
    {"code": "ENGD 101", "name": "Representations of Design Studio"},
    {"code": "ENGD 102", "name": "Design Realization Studio"},
    {"code": "ENGD 103", "name": "Designing for Disabilities Studio"},
    {"code": "ENGD 110", "name": "Circuits, Software Development, and Societal Impact Design Studio"},
    {"code": "ENGD 111", "name": "Science, Technology, and Society in Design"},
    {"code": "ENGD 112", "name": "DC Circuits"},
    {"code": "ENGD 113", "name": "Software Development Principles I"},
    {"code": "ENGD 120", "name": "Integrating Electrical, Software, and Societal Systems"},
    {"code": "ENGD 121", "name": "Science, Technology, and Society in Design"},
    {"code": "ENGD 122", "name": "AC Circuits"},
    {"code": "ENGD 123", "name": "Software Development Principles II"},
    {"code": "ENGD 150", "name": "Independent Design Project"},
    {"code": "ENGD 151", "name": "Problem Solving and Data Representation"},
    {"code": "ENGD 190", "name": "Selected Topics in Engineering Design"},
    {"code": "ENGD 199", "name": "Professional Experience"},
    {"code": "ENGD 240", "name": "User Experience Design Studio"},
    {"code": "ENGD 241", "name": "Technical Communication in Design"},
    {"code": "ENGD 242", "name": "Design Thinking"},
    {"code": "ENGD 243", "name": "Software Development Principles III"},
    {"code": "ENGD 250", "name": "Human Computer Interfaces Studio"},
    {"code": "ENGD 251", "name": "Technical Communication in Design II"},
    {"code": "ENGD 252", "name": "Design of Human-Computer Interfaces"},
    {"code": "ENGD 253", "name": "Software Development Principles"},
    {"code": "ENGD 260", "name": "Product Design Studio"},
    {"code": "ENGD 270", "name": "Vertically Integrated Project I"},
    {"code": "ENGD 271", "name": "Design Testing"},
    {"code": "ENGD 290", "name": "Selected Topics in Engineering Design"},
    {"code": "ENGD 300", "name": "Engineering Practicum I"},
    {"code": "ENGD 301", "name": "Creative Design Practicum"},
    {"code": "ENGD 302", "name": "Human Factors Practicum"},
    {"code": "ENGD 303", "name": "Systems Architecture Practicum"},
    {"code": "ENGD 304", "name": "Material Properties Practicum"},
    {"code": "ENGD 305", "name": "Material Selection Practicum"},
    {"code": "ENGD 308", "name": "Lean Manufacturing Process Fundamental Practicum"},
    {"code": "ENGD 309", "name": "Lean Manufacturing Kaizen Fundamentals Practicum"},
    {"code": "ENGD 310", "name": "Design for Assembly Practicum"},
    {"code": "ENGD 311", "name": "Tolerance Analysis and Application Practicum"},
    {"code": "ENGD 312", "name": "Design for Sheet Metal Fabrication Practicum"},
    {"code": "ENGD 313", "name": "Design for Metal Forming Practicum"},
    {"code": "ENGD 314", "name": "Curves, Surfaces, and Parametric, Equation-Based Design Practicum"},
    {"code": "ENGD 315", "name": "Measuring User Experience Practicum"},
    {"code": "ENGD 316", "name": "Facilities Management"},
    {"code": "ENGD 390", "name": "Selected Topics in Engineering Design"},
    {"code": "ENGD 410", "name": "Capstone Design I"},
    {"code": "ENGD 490", "name": "Selected Topics in Engineering Design"},
]

# Chemistry (CHEM) Courses (Already provided)


# Function to upload courses
def upload_courses(course_list, department):
    courses_ref = db.collection("courses")
    for course in course_list:
        course_data = {
            "department": department,
            "name": course["name"],
            "code": course["code"]
        }
        # Use course code as document ID
        courses_ref.document(course["code"]).set(course_data)
        print(f"✅ Added: {course['code']} - {course['name']} ({department})")

if __name__ == "__main__":
    print("\n🚀 Uploading Engineering Design (ENGD) courses...")
    upload_courses(engd_courses, "Engineering Design")
    

    print("\n✅ All courses uploaded successfully!")
