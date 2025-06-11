import React, { useState } from "react";
import {
  Copy,
  Check,
  Search,
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  User,
  Mail,
  Lock,
} from "lucide-react";

const Forms = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "usuario@ejemplo.com",
    name: "",
    password: "123",
    age: "",
    notifications: true,
    plan: "free",
  });

  const [copied, setCopied] = useState("");

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const CodeExample = ({
    code,
    id,
    title,
  }: {
    code: string;
    id: string;
    title: string;
  }) => (
    <div className="bg-black/50 rounded-lg p-4 relative group mt-4">
      <p className="text-sm text-slate-400 mb-2">{title}</p>
      <pre className="text-xs text-green-400 font-mono overflow-x-auto">
        {code}
      </pre>
      <button
        onClick={() => copyCode(code, id)}
        className="absolute top-2 right-2 p-1 bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied === id ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-slate-400" />
        )}
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      <section className="section-container p-8">
        <h2 className="text-3xl font-bold mb-6">Sistema de Formularios</h2>
        <p className="text-slate-300 mb-8">
          Inputs, selects y elementos de formulario con estados y validaciones.
        </p>

        {/* Input Dark (Tu estilo) */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Input Dark (Estilo MIM)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Input Normal
              </label>
              <input
                type="text"
                placeholder="Escribe aquí..."
                className="w-full bg-white/10 border border-white/20 focus:border-blue-400/50 focus:bg-white/15 rounded-lg p-3 text-white placeholder:text-slate-400 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Con Icono
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar recursos..."
                  className="w-full bg-white/10 border border-white/20 focus:border-blue-400/50 focus:bg-white/15 rounded-lg p-3 pl-10 text-white placeholder:text-slate-400 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password Toggle
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña..."
                  className="w-full bg-white/10 border border-white/20 focus:border-blue-400/50 focus:bg-white/15 rounded-lg p-3 pl-10 pr-10 text-white placeholder:text-slate-400 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Select
              </label>
              <div className="relative">
                <select className="w-full bg-white/10 border border-white/20 focus:border-blue-400/50 focus:bg-white/15 rounded-lg p-3 pr-10 text-white appearance-none transition-all duration-200">
                  <option value="" className="bg-slate-800">
                    Selecciona edad
                  </option>
                  <option value="8" className="bg-slate-800">
                    8 años
                  </option>
                  <option value="9" className="bg-slate-800">
                    9 años
                  </option>
                  <option value="10" className="bg-slate-800">
                    10 años
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Textarea (Como tu InputForm)
            </label>
            <textarea
              placeholder="Mi hijo de 4 años tiene miedo a la oscuridad y no quiere dormir solo..."
              className="w-full bg-white/10 border border-white/20 focus:border-blue-400/50 focus:bg-white/15 rounded-lg p-3 text-white placeholder:text-slate-400 transition-all duration-200 min-h-[100px] resize-y"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-slate-500">
                {formData.name.split(" ").filter((w) => w.length > 0).length}{" "}
                palabras
              </span>
              <span className="text-xs text-slate-500">
                {formData.name.length}/500
              </span>
            </div>
          </div>

          <CodeExample
            id="input-dark"
            title="CSS para inputs dark:"
            code={`.input-primary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  color: white;
  transition: all var(--duration-200) var(--ease-smooth);
  backdrop-filter: blur(8px);
}

.input-primary::placeholder {
  color: rgba(148, 163, 184, 0.7);
}

.input-primary:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}`}
          />
        </div>

        {/* Input Light */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Input Light (Para ResourceCard)
          </h3>

          <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tu nombre..."
                    className="w-full bg-white/80 border border-slate-300 focus:border-indigo-500 focus:bg-white rounded-lg p-3 pl-10 text-slate-800 placeholder:text-slate-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-white/80 border border-slate-300 focus:border-indigo-500 focus:bg-white rounded-lg p-3 pl-10 text-slate-800 placeholder:text-slate-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <CodeExample
            id="input-light"
            title="CSS para inputs light:"
            code={`.input-light {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  color: var(--color-neutral-800);
  transition: all var(--duration-200) var(--ease-smooth);
  backdrop-filter: blur(8px);
}

.input-light:focus {
  outline: none;
  border-color: var(--color-primary-500);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}`}
          />
        </div>

        {/* Estados de Validación */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Estados de Validación
          </h3>

          <div className="space-y-6">
            {/* Success */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email (Válido)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  className="w-full bg-white/10 border border-green-500/50 focus:border-green-400 rounded-lg p-3 pl-10 pr-10 text-white transition-all duration-200"
                  readOnly
                />
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
              </div>
              <p className="text-sm text-green-400 mt-1 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Email válido y disponible
              </p>
            </div>

            {/* Error */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre (Requerido)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tu nombre completo..."
                  className="w-full bg-white/10 border border-red-500/50 focus:border-red-400 rounded-lg p-3 pl-10 pr-10 text-white placeholder:text-slate-400 transition-all duration-200"
                />
                <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
              </div>
              <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                Este campo es obligatorio
              </p>
            </div>

            {/* Warning */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña (Débil)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-4 h-4" />
                <input
                  type="password"
                  value={formData.password}
                  className="w-full bg-white/10 border border-yellow-500/50 focus:border-yellow-400 rounded-lg p-3 pl-10 pr-10 text-white transition-all duration-200"
                  readOnly
                />
                <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-4 h-4" />
              </div>
              <p className="text-sm text-yellow-400 mt-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Contraseña muy débil, usa al menos 8 caracteres
              </p>
            </div>

            {/* Info */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Código de verificación
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ingresa el código de 6 dígitos..."
                  className="w-full bg-white/10 border border-blue-400/50 focus:border-blue-400 rounded-lg p-3 pr-10 text-white placeholder:text-slate-400 transition-all duration-200"
                />
                <Info className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
              </div>
              <p className="text-sm text-blue-400 mt-1 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Revisa tu email para obtener el código
              </p>
            </div>
          </div>

          <CodeExample
            id="validation"
            title="Estados de validación:"
            code={`/* Estados */
.input-success { border-color: rgba(34, 197, 94, 0.5); }
.input-error { border-color: rgba(239, 68, 68, 0.5); }
.input-warning { border-color: rgba(245, 158, 11, 0.5); }
.input-info { border-color: rgba(59, 130, 246, 0.5); }

/* Focus states */
.input-success:focus { 
  border-color: var(--color-success-500);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* Mensajes */
.message-success { color: var(--color-success-500); }
.message-error { color: var(--color-error-500); }
.message-warning { color: var(--color-warning-500); }
.message-info { color: #3b82f6; }`}
          />
        </div>

        {/* Checkboxes y Radio */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Checkboxes y Radio Buttons
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-white mb-4">Checkboxes</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500 focus:ring-2"
                    checked={formData.notifications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notifications: e.target.checked,
                      })
                    }
                  />
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    Recibir notificaciones por email
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    Acepto términos y condiciones
                  </span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white mb-4">Radio Buttons</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="plan"
                    value="free"
                    className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 focus:ring-indigo-500 focus:ring-2"
                    checked={formData.plan === "free"}
                    onChange={(e) =>
                      setFormData({ ...formData, plan: e.target.value })
                    }
                  />
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    Plan Gratuito
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="plan"
                    value="premium"
                    className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 focus:ring-indigo-500 focus:ring-2"
                    checked={formData.plan === "premium"}
                    onChange={(e) =>
                      setFormData({ ...formData, plan: e.target.value })
                    }
                  />
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    Plan Premium
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Kit Completo */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Kit Completo CSS
          </h3>

          <CodeExample
            id="complete-forms"
            title="Sistema completo de formularios:"
            code={`/* === FORMS SYSTEM === */

/* Base Input */
.input {
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  font-size: var(--fontSize-sm);
  transition: all var(--duration-200) var(--ease-smooth);
  width: 100%;
}

/* Dark Input (MIM Style) */
.input-primary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(8px);
}

.input-primary::placeholder {
  color: rgba(148, 163, 184, 0.7);
}

.input-primary:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Light Input */
.input-light {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.8);
  color: var(--color-neutral-800);
  backdrop-filter: blur(8px);
}

.input-light::placeholder {
  color: var(--color-neutral-500);
}

.input-light:focus {
  outline: none;
  border-color: var(--color-primary-500);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Textarea */
.textarea-primary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  color: white;
  font-size: var(--fontSize-sm);
  backdrop-filter: blur(8px);
  width: 100%;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
}

/* Select */
.select-primary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  color: white;
  backdrop-filter: blur(8px);
  width: 100%;
  appearance: none;
  cursor: pointer;
}

.select-primary option {
  background: var(--color-neutral-800);
  color: white;
}

/* Validation States */
.input-success { border-color: rgba(34, 197, 94, 0.5); }
.input-error { border-color: rgba(239, 68, 68, 0.5); }
.input-warning { border-color: rgba(245, 158, 11, 0.5); }
.input-info { border-color: rgba(59, 130, 246, 0.5); }

/* Labels */
.label-primary {
  display: block;
  font-size: var(--fontSize-sm);
  font-weight: 500;
  color: var(--color-neutral-300);
  margin-bottom: var(--space-2);
}

/* Messages */
.form-message {
  font-size: var(--fontSize-sm);
  margin-top: var(--space-1);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

/* Input with Icon */
.input-with-icon {
  position: relative;
}

.input-with-icon input {
  padding-left: var(--space-10);
}

.input-with-icon .icon {
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-neutral-400);
  width: 1rem;
  height: 1rem;
}

/* Checkboxes and Radio */
.checkbox-primary,
.radio-primary {
  width: 1rem;
  height: 1rem;
  color: var(--color-primary-600);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.checkbox-primary {
  border-radius: var(--radius-sm);
}

/* JSX Examples */
{/* Basic Input */}
<input 
  type="text" 
  className="input-primary" 
  placeholder="Placeholder text..." 
/>

{/* Input with Icon */}
<div className="input-with-icon">
  <Search className="icon" />
  <input type="text" className="input-primary" />
</div>

{/* Textarea */}
<textarea className="textarea-primary" rows={4} />

{/* Select */}
<div className="relative">
  <select className="select-primary">
    <option>Choose option</option>
  </select>
  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
</div>`}
          />
        </div>
      </section>
    </div>
  );
};

export default Forms;
