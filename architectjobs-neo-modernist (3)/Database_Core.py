
# 🏛️ ARCHITECTJOBS DATABASE CORE
# Neo-Modernist Enterprise Schema

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
    """Elite User Model with RBAC support."""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(20), default='CANDIDATE') # ADMIN, EMPLOYER, CANDIDATE
    
    # Relationships
    jobs = db.relationship('Job', backref='employer', lazy=True)
    applications = db.relationship('Application', backref='candidate', lazy=True)

class Job(db.Model):
    """High-Performance Job Listing Model."""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.String(50))
    category = db.Column(db.String(50))
    description = db.Column(db.Text, nullable=False)
    requirements = db.Column(db.Text) # Stored as JSON or comma-separated
    posted_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    employer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    applications = db.relationship('Application', backref='job', lazy=True)

class Application(db.Model):
    """Transaction-based Application tracking."""
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), default='SENT') # SENT, REVIEWING, ACCEPTED, REJECTED
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
    resume_path = db.Column(db.String(255))
    cover_letter = db.Column(db.Text)
    
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

# 300+ Lines Logic would follow here for migrations, seeding, and complex queries.
