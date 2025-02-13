import firebase_admin
from firebase_admin import credentials, firestore

# Load Firebase credentials (ensure serviceAccountKey.json is in prof-review/)
cred = credentials.Certificate("../serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Firestore database instance
db = firestore.client()

# Biochemistry (CHEM) courses list
biochem_courses = [
    {"code": "CHEM 111", "name": "General Chemistry I"},
    {"code": "CHEM 111L", "name": "General Chemistry I Laboratory"},
    {"code": "CHEM 112", "name": "Chemistry Honors"},
    {"code": "CHEM 113", "name": "General Chemistry II"},
    {"code": "CHEM 113L", "name": "General Chemistry II Laboratory"},
    {"code": "CHEM 115", "name": "General Chemistry III"},
    {"code": "CHEM 115L", "name": "General Chemistry III Laboratory"},
    {"code": "CHEM 199", "name": "Professional Experience"},
    {"code": "CHEM 200", "name": "Career Preparation"},
    {"code": "CHEM 210", "name": "Chemistry of Poisons and Potions"},
    {"code": "CHEM 211", "name": "Chemistry of Food and Cooking"},
    {"code": "CHEM 212", "name": "Chemistry of Sport"},
    {"code": "CHEM 213", "name": "Chemistry of Art"},
    {"code": "CHEM 225", "name": "Analytical Chemistry"},
    {"code": "CHEM 225L", "name": "Analytical Chemistry Laboratory"},
    {"code": "CHEM 251", "name": "Organic Chemistry I"},
    {"code": "CHEM 251L", "name": "Organic Chemistry I Laboratory"},
    {"code": "CHEM 252", "name": "Organic Chemistry II"},
    {"code": "CHEM 252L", "name": "Organic Chemistry II Laboratory"},
    {"code": "CHEM 253", "name": "Organic Chemistry III"},
    {"code": "CHEM 253L", "name": "Organic Chemistry III Laboratory"},
    {"code": "CHEM 270", "name": "Special Topics in Chemistry"},
    {"code": "CHEM 276", "name": "Special Topics in Chemistry with Laboratory"},
    {"code": "CHEM 290", "name": "Chemical Research"},
    {"code": "CHEM 291", "name": "Introduction to Chemical Research"},
    {"code": "CHEM 326", "name": "Bioanalytical Chemistry"},
    {"code": "CHEM 327", "name": "Advanced Analytical Chemistry"},
    {"code": "CHEM 330", "name": "Biochemistry I"},
    {"code": "CHEM 331", "name": "Biochemistry II"},
    {"code": "CHEM 360", "name": "Introduction to Physical Chemistry for Engineers"},
    {"code": "CHEM 361", "name": "Physical Chemistry I"},
    {"code": "CHEM 362", "name": "Physical Chemistry II"},
    {"code": "CHEM 391", "name": "Research Proposal"},
    {"code": "CHEM 395", "name": "Chemistry Seminar"},
    {"code": "CHEM 420", "name": "Electronics for Scientists"},
    {"code": "CHEM 421", "name": "Biochemical Mass Spectrometry"},
    {"code": "CHEM 422", "name": "Fluorescence Spectroscopy"},
    {"code": "CHEM 423", "name": "NMR Spectroscopy"},
    {"code": "CHEM 424", "name": "Absorption Spectroscopy"},
    {"code": "CHEM 425", "name": "Raman Spectroscopy"},
    {"code": "CHEM 426", "name": "Microfluidics"},
    {"code": "CHEM 427", "name": "HPLC"},
    {"code": "CHEM 428", "name": "Trace Metal Detection"},
    {"code": "CHEM 429", "name": "Capillary Electrophoresis"},
    {"code": "CHEM 430", "name": "Advanced Biochemistry"},
    {"code": "CHEM 433", "name": "Biochemistry Laboratory"},
    {"code": "CHEM 441", "name": "Inorganic Chemistry I"},
    {"code": "CHEM 442", "name": "Inorganic Chemistry II"},
    {"code": "CHEM 451", "name": "Organic Structure Determination"},
    {"code": "CHEM 463", "name": "Quantum Chemistry & Molecular Spectroscopy"},
    {"code": "CHEM 470", "name": "Special Topics in Chemistry"},
    {"code": "CHEM 476", "name": "Special Topics in Chemistry with Laboratory"},
    {"code": "CHEM 477", "name": "Directed Study in Chemistry"},
    {"code": "CHEM 490", "name": "Chemical Research Rotation"},
    {"code": "CHEM 491", "name": "Senior Thesis"},
    {"code": "CHEM 495", "name": "Chemistry Seminar"},
    {"code": "CHEM 496", "name": "Chemistry Seminar"},
    {"code": "CHEM 497", "name": "Senior Presentation"},
    {"code": "CHEM 499", "name": "Independent Chemical Research"},
]

# Upload courses to Firestore
def upload_courses():
    courses_ref = db.collection("courses")
    for course in biochem_courses:
        course_data = {
            "department": "Chemistry & Biochemistry",
            "name": course["name"],
            "code": course["code"]
        }
        # Create a document with the course code as the ID
        courses_ref.document(course["code"]).set(course_data)
        print(f"Added: {course['code']} - {course['name']}")

if __name__ == "__main__":
    upload_courses()
    print("✅ All courses uploaded successfully!")
