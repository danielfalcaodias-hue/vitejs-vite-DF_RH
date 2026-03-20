import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Lock, LayoutDashboard, Users, Briefcase, Plus, Search, Bell, Menu 
} from 'lucide-react';

// --- PROTEÇÃO ---
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <form onSubmit={verificar} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-blue-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Workview Portal</h1>
          <input 
            type="password" 
            onChange={(e) => setSenha(e.target.value)} 
            className="w-full px-4 py-3 border border-slate-200 rounded-lg mb-4 text-center focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="Senha de Acesso" 
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all">
            Entrar
          </button>
        </form>
      </div>
    );
  }
  return <>{children}</>;
};

// --- PORTAL RESPONSIVO ---
const MainDashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar - Esconde em ecrãs muito pequenos */}
      <aside className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col transition-all">
        <div className="p-6 font-bold text-xl flex items-center gap-3">
          <Briefcase className="text-blue-500" />
          <span className="hidden lg:inline">Workview</span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg cursor-pointer">
            <LayoutDashboard size={20}/> <span className="hidden lg:inline">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-lg cursor-pointer">
            <Users size={20}/> <span className="hidden lg:inline">Candidatos</span>
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 text-sm" placeholder="Pesquisar..." />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-slate-400" size={20} />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">DF</div>
          </div>
        </header>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Painel de Recrutamento</h1>
                <p className="text-slate-500 text-sm">Bem-vindo à gestão de talentos Workview</p>
              </div>
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 w-fit">
                <Plus size={18} /> Nova Vaga
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Candidatos</p>
                <p className="text-2xl font-bold text-slate-900">1,284</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Vagas</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Score IA</p>
                <p className="text-2xl font-bold text-emerald-600">88%</p>
              </div>
            </div>

            {/* Tabela com scroll horizontal próprio */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-50 font-bold">Candidaturas Recentes</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="px-6 py-4">Nome</th>
                      <th className="px-6 py-4">Vaga</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4 font-semibold text-slate-900 text-sm">Ana Martins</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">UX Designer</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">EM TRIAGEM</span></td>
                      <td className="px-6 py-4 text-right font-bold text-blue-600">98%</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4 font-semibold text-slate-900 text-sm">Pedro Santos</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">Frontend Dev</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-[10px] font-bold">ENTREVISTA</span></td>
                      <td className="px-6 py-4 text-right font-bold text-purple-600">92%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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