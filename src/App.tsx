import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Lock, LayoutDashboard, Users, Briefcase, Search, Calendar, 
  Bell, Settings, LogOut, TrendingUp, Plus, ChevronRight, Filter
} from 'lucide-react';

// --- PROTEÇÃO POR SENHA ---
const Gatekeeper = ({ children }: { children: React.ReactNode }) => {
  const [senha, setSenha] = useState('');
  const [autorizado, setAutorizado] = useState(false);

  const verificar = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha === 'Workview2026') setAutorizado(true);
    else alert('Senha incorreta!');
  };

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans text-slate-900">
        <form onSubmit={verificar} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-blue-600" size={40} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Workview Portal</h1>
          <p className="text-slate-500 mb-8">Área Restrita - Recrutamento</p>
          <input
            type="password"
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-4 border border-slate-200 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
            placeholder="Introduza a senha"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200">
            Aceder ao Painel
          </button>
        </form>
      </div>
    );
  }
  return <>{children}</>;
};

// --- PORTAL DE RECRUTAMENTO REAL ---
const MainDashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Menu Lateral */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-blue-600 p-2 rounded-lg"><Briefcase size={20}/></div>
          <span className="font-bold text-xl tracking-tight">Workview RH</span>
        </div>
        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg cursor-pointer"><LayoutDashboard size={20}/> Dashboard</div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-lg cursor-pointer"><Users size={20}/> Candidatos</div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-lg cursor-pointer"><Briefcase size={20}/> Vagas</div>
        </nav>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Painel de Recrutamento</h1>
            <p className="text-slate-500">Gestão de Talentos - Workview</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100">
            <Plus size={20} /> Nova Vaga
          </button>
        </header>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Candidatos Totais</p>
            <p className="text-3xl font-bold">1,284</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Vagas em Aberto</p>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Taxa de Conversão</p>
            <p className="text-3xl font-bold text-emerald-600">88%</p>
          </div>
        </div>

        {/* Lista de Candidatos */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="font-bold text-lg">Candidaturas Recentes</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Vaga Aplicada</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Pontuação IA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-medium">Ana Martins</td>
                <td className="px-6 py-4 text-slate-500">UX Designer Senior</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Em Triagem</span></td>
                <td className="px-6 py-4 font-bold text-blue-600">98/100</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-medium">Pedro Santos</td>
                <td className="px-6 py-4 text-slate-500">Frontend Developer</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">Entrevista</span></td>
                <td className="px-6 py-4 font-bold text-purple-600">92/100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
export default function App() {
  return (
    <BrowserRouter>
      <Gatekeeper>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Gatekeeper>
    </BrowserRouter>
  );
}