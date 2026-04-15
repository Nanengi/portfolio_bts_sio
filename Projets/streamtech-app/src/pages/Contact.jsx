// src/pages/Contact.jsx
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'L\'email est invalide';
    }

    // Validation du sujet
    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    // Validation de la checkbox
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulation d'un envoi (remplace par un vrai appel API)
    setTimeout(() => {
      console.log('Données du formulaire:', formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        acceptTerms: false
      });

      // Masquer le message de succès après 5 secondes
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1 className="mb-4">📬 Contactez-nous</h1>

        {submitSuccess && (
          <div className="alert alert-success alert-dismissible fade show">
            <strong>✅ Message envoyé !</strong> Nous vous répondrons dans les plus brefs délais.
            <button
              type="button"
              className="btn-close"
              onClick={() => setSubmitSuccess(false)}
            ></button>
          </div>
        )}

        <div className="card shadow">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit} noValidate>
              {/* Nom */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nom complet <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Sujet */}
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Sujet <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.subject ? 'is-invalid' : ''}`}
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Choisissez un sujet</option>
                  <option value="question">Question générale</option>
                  <option value="bug">Signaler un bug</option>
                  <option value="feature">Demande de fonctionnalité</option>
                  <option value="other">Autre</option>
                </select>
                {errors.subject && (
                  <div className="invalid-feedback">{errors.subject}</div>
                )}
              </div>

              {/* Message */}
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback">{errors.message}</div>
                )}
                <div className="form-text">
                  {formData.message.length}/500 caractères
                </div>
              </div>

              {/* Checkbox */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="acceptTerms">
                  J'accepte les conditions d'utilisation
                </label>
                {errors.acceptTerms && (
                  <div className="invalid-feedback d-block">
                    {errors.acceptTerms}
                  </div>
                )}
              </div>

              {/* Bouton submit */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Envoi en cours...
                  </>
                ) : (
                  '📨 Envoyer le message'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Informations de contact */}
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5>📍 Adresse</h5>
                <p className="text-muted">123 Rue du Web<br />75001 Paris</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5>📧 Email</h5>
                <p className="text-muted">contact@streamtech.fr</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5>📞 Téléphone</h5>
                <p className="text-muted">01 23 45 67 89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
