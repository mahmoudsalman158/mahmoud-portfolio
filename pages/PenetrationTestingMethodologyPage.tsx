


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PENETRATION_TESTING_STEPS, BONUS_TOOLS_DATA } from '../constants';
import { MethodologyStepItem, TocItem, BonusToolItem, MethodologySubStepItem } from '../types';
import CodeSnippet from '../components/methodology/CodeSnippet'; 

declare const L: any; 

const generateTocItems = (steps: MethodologyStepItem[]): TocItem[] => {
  return steps.map(step => ({ id: step.id, title: step.title, level: 1 }));
};


const PenetrationTestingMethodologyPage: React.FC = () => {
  const [activeTocId, setActiveTocId] = useState<string | null>(null);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const tocItems = generateTocItems(PENETRATION_TESTING_STEPS);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const location = useLocation();

  const [interactiveParams, setInteractiveParams] = useState<Record<string, any>>({});

  useEffect(() => {
    const initialParamsForAllSteps: Record<string, any> = {};
    PENETRATION_TESTING_STEPS.forEach(step => {
      const initialStepParams: Record<string, any> = {};
      if (step.interactiveElement?.initialValue !== undefined) {
        initialStepParams.value = step.interactiveElement.initialValue;
        // Specifically for subdomain-enumeration, ensure targetDomain is initialized
        if (step.id === 'subdomain-enumeration' && typeof step.interactiveElement.initialValue === 'string') {
            initialStepParams.targetDomain = step.interactiveElement.initialValue;
        }
      }
      if (step.commands?.[0]?.params) {
        Object.assign(initialStepParams, step.commands[0].params, initialStepParams);
      }
      if (step.interactiveElement?.type === 'parameter-form' && step.interactiveElement.options) {
        step.interactiveElement.options.forEach((opt: any) => {
            if (opt.fields) {
                const methodKey = opt.id.split('-')[1]?.toUpperCase();
                if(methodKey) {
                    initialStepParams[methodKey] = initialStepParams[methodKey] || {};
                    opt.fields.forEach((field:any) => {
                         initialStepParams[methodKey][field.id] = field.initialValue || '';
                    });
                }
            }
        });
         if(step.interactiveElement.initialValue?.currentMethod){
            initialStepParams.currentMethod = step.interactiveElement.initialValue.currentMethod;
        }
      }

      if (Object.keys(initialStepParams).length > 0) {
        initialParamsForAllSteps[step.id] = initialStepParams;
      }
    });
    setInteractiveParams(initialParamsForAllSteps);
  }, []);

  const handleInteractiveChange = (stepId: string, paramName: string, value: any) => {
    setInteractiveParams(prev => {
        const stepParamsToUpdate = { ...(prev[stepId] || {}) };
        
        stepParamsToUpdate[paramName] = value;

        // If the changed parameter is the primary input for 'subdomain-enumeration' (which uses 'value' as paramName)
        // then also explicitly set 'targetDomain' property for this step's params.
        if (stepId === 'subdomain-enumeration' && paramName === 'value') {
          stepParamsToUpdate.targetDomain = value;
        }
        
        return { ...prev, [stepId]: stepParamsToUpdate };
    });
  };
  
  const handleTagInputChange = (stepId: string, newTags: string[]) => {
     setInteractiveParams(prev => ({
      ...prev,
      [stepId]: { ...(prev[stepId] || {}), extensions: newTags, value: newTags } 
    }));
  };

  const handleSqlmapFormChange = (stepId: string, formType: 'GET' | 'POST' | 'REQUESTFILE', field: string, value: any) => {
     setInteractiveParams(prev => {
        const stepState = prev[stepId] || { currentMethod: formType }; 
        const methodState = stepState[formType] || {};
        return {
            ...prev,
            [stepId]: {
                ...stepState,
                currentMethod: formType, 
                [formType]: { ...methodState, [field]: value }
            }
        };
    });
  };


  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTocId(entry.target.id);
        }
      });
    };
    const observerOptions = { rootMargin: '-20% 0px -70% 0px', threshold: 0.1 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(sectionRefs.current).forEach(section => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [tocItems]);
  
   useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveTocId(id);
      }
    } else {
        window.scrollTo(0,0); 
    }
  }, [location.hash]);

  const mapRef = useRef<any | null>(null); 
  const initializeMap = useCallback((containerId: string) => {
    if (typeof L === 'undefined' || (document.getElementById(containerId) as any)?._leaflet_id) return; 
    try {
        const mapContainer = document.getElementById(containerId);
        if(!mapContainer) return;
        mapRef.current = L.map(containerId).setView([20, 0], 2); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);
        const mockIPs = [
          { ip: "8.8.8.8", lat: 37.7749, lon: -122.4194, city: "San Francisco (Google DNS)" },
          { ip: "1.1.1.1", lat: -33.8688, lon: 151.2093, city: "Sydney (Cloudflare DNS)" },
          { ip: "93.184.216.34", lat: 40.7128, lon: -74.0060, city: "New York (Example.com)" }
        ];
        mockIPs.forEach((ipInfo: {ip: string, lat: number, lon: number, city: string}) => {
        if(mapRef.current) {
            L.marker([ipInfo.lat, ipInfo.lon])
            .addTo(mapRef.current)
            .bindPopup(`<b>${ipInfo.ip}</b><br>${ipInfo.city}`);
        }
        });
    } catch (error) {
        console.error("Error initializing Leaflet map:", error);
    }
  }, []);

   const renderInteractiveElement = (step: MethodologyStepItem) => {
    const stepId = step.id; 
    const params = interactiveParams[stepId] || {};
    
    let valueForInput = '';
    if (step.interactiveElement?.initialValue !== undefined) { // Primary way to get value if initialValue was set
        valueForInput = params.value;
    } else if (step.interactiveElement?.type === 'text-input') { // Fallback for text-input if no initialValue, try a common param or default
        valueForInput = params.targetDomain || params.targetIpOrHost || '';
    }
    valueForInput = valueForInput === undefined ? (step.interactiveElement?.initialValue || '') : valueForInput;


    switch (step.interactiveElement?.type) {
      case 'text-input':
        // Determine paramName for onChange: if initialValue was set, it implies 'value' is the primary storage key.
        // Otherwise, for a text input without initialValue, it might be a specific named param like 'targetDomain'.
        // However, the current 'subdomain-enumeration' step *does* have initialValue.
        const onChangeParamName = step.interactiveElement?.initialValue !== undefined ? 'value' : 'targetDomain';

        return (
          <div className="my-3 methodology-param-form">
            <label htmlFor={`${stepId}-input`} className="block text-sm font-medium text-accent-blue mb-1">{step.interactiveElement.label}</label>
            <input
              type="text"
              id={`${stepId}-input`}
              value={valueForInput}
              onChange={(e) => handleInteractiveChange(stepId, onChangeParamName, e.target.value)}
              placeholder={step.interactiveElement.placeholder}
              className="w-full bg-base-light-dark border border-gray-600 rounded-md py-2 px-3 text-text-off-white focus:ring-accent-blue focus:border-accent-blue"
            />
          </div>
        );
      case 'tabs':
        return (
            <div className="my-3">
                {step.interactiveElement.options?.map((tabOption: any, index: number) => (
                     <details key={tabOption.id || index} className="mb-2 bg-gray-800 rounded group" open={index === 0}>
                        <summary className="p-3 font-semibold text-accent-green cursor-pointer group-hover:text-white list-none flex justify-between items-center">
                            {tabOption.name}
                            <i className="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                        </summary>
                        <div className="p-3 border-t border-gray-700">
                            {Array.isArray(tabOption.content) ? 
                                tabOption.content.map((cmd: any, cmdIdx: number) => (
                                    <CodeSnippet key={cmdIdx} language={cmd.language} code={typeof cmd.code === 'function' ? cmd.code(params) : cmd.code} showCopyButton={cmd.showCopyButton} />
                                )) : 
                                <div className="text-gray-300 prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{__html: tabOption.content}}></div>
                            }
                        </div>
                    </details>
                ))}
            </div>
        );
       case 'json-viewer':
        return (
          <details className="my-3 bg-gray-800 rounded group">
            <summary className="p-3 font-semibold text-accent-green cursor-pointer group-hover:text-white list-none">View Mock JSON Output <i className="fas fa-chevron-down group-open:rotate-180 transition-transform inline-block"></i></summary>
            <div className="p-3 border-t border-gray-700">
              <CodeSnippet language="json" code={JSON.stringify(step.mockOutput || { message: "No data" }, null, 2)} showCopyButton={false} />
            </div>
          </details>
        );
      case 'tag-input':
        const currentTags: string[] = params.extensions || params.value || step.interactiveElement.initialValue || [];
        return (
          <div className="my-3 methodology-param-form">
            <label className="block text-sm font-medium text-accent-blue mb-1">{step.interactiveElement.label}</label>
            <div className="flex flex-wrap items-center gap-2 p-2 bg-base-light-dark border border-gray-600 rounded-md">
              {currentTags.map((tag, index) => (
                <span key={index} className="methodology-tag text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                  {tag}
                  <button 
                    onClick={() => handleTagInputChange(stepId, currentTags.filter((_, i) => i !== index))}
                    className="ml-2 remove-tag-btn text-sm hover:text-accent-red" aria-label={`Remove ${tag} tag`}
                  >&times;</button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add value, press Enter..."
                className="flex-grow bg-transparent p-1 focus:outline-none text-text-off-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    const newTag = (e.target as HTMLInputElement).value.trim();
                    if (newTag && !currentTags.includes(newTag)) {
                      handleTagInputChange(stepId, [...currentTags, newTag]);
                    }
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>
          </div>
        );
        case 'dropdown-selector':
            return (
                <div className="my-3 methodology-param-form">
                    <label htmlFor={`${stepId}-select`} className="block text-sm font-medium text-accent-blue mb-1">{step.interactiveElement.label}</label>
                    <select
                        id={`${stepId}-select`}
                        value={params.templateCategory || params.value || step.interactiveElement.initialValue || ''}
                        onChange={(e) => handleInteractiveChange(stepId, 'templateCategory', e.target.value)}
                        className="w-full bg-base-light-dark border border-gray-600 rounded-md py-2 px-3 text-text-off-white focus:ring-accent-blue focus:border-accent-blue"
                    >
                        {step.interactiveElement.options?.map((opt: {value: string, label: string}) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            );
        case 'parameter-form': 
            const currentMethod = params.currentMethod || step.interactiveElement.options?.[0]?.id.split('-')[1]?.toUpperCase() || 'GET';
            const formConfig = step.interactiveElement.options?.find((opt: any) => opt.id.includes(currentMethod.toLowerCase()));
            const formParams = params[currentMethod] || {};
            
            return (
                 <div className="my-4 p-4 border border-gray-700 rounded-md bg-gray-800 methodology-param-form">
                    <div className="flex mb-3 border-b border-gray-600">
                        {step.interactiveElement.options?.map((opt: any) => {
                             const methodType = opt.id.split('-')[1]?.toUpperCase();
                             if (!methodType) return null;
                             return (
                                <button key={opt.id} 
                                        onClick={() => handleInteractiveChange(stepId, 'currentMethod', methodType)}
                                        className={`py-2 px-4 font-semibold -mb-px border-b-2
                                            ${currentMethod === methodType ? 'border-accent-blue text-accent-blue' : 'border-transparent text-gray-400 hover:text-accent-blue'}`}>
                                    {opt.name}
                                </button>
                            );
                        })}
                    </div>
                    {formConfig?.fields.map((field: any) => (
                        <div key={field.id} className="mb-3">
                            <label htmlFor={`${stepId}-${currentMethod}-${field.id}`} className="block text-sm font-medium text-accent-purple mb-1">{field.label}</label>
                            <input
                                type={field.type || 'text'}
                                id={`${stepId}-${currentMethod}-${field.id}`}
                                value={formParams[field.id] || field.initialValue || ''}
                                onChange={(e) => handleSqlmapFormChange(stepId, currentMethod as 'GET' | 'POST' | 'REQUESTFILE', field.id, e.target.value)}
                                className="w-full bg-base-light-dark border border-gray-600 rounded-md py-2 px-3 text-text-off-white focus:ring-accent-purple focus:border-accent-purple"
                            />
                        </div>
                    ))}
                </div>
            );
      default: return <div className="my-3 text-sm text-gray-500">Interactive element type "{step.interactiveElement?.type}" not fully implemented.</div>;
    }
  };
  
   const renderVisualizations = (step: MethodologyStepItem) => {
    if (!step.visualizations) return null;
    switch (step.visualizations.type) {
      case 'bar-chart':
        const chartData = step.visualizations.data || { labels: [], values: [] };
        const maxValue = Math.max(...chartData.values, 1); 
        return (
          <div className="my-4 p-3 bg-gray-800 rounded-md">
            <h4 className="text-sm font-semibold text-accent-green mb-2">Host Scan Summary (Mock)</h4>
            <div className="bar-chart-container">
              {chartData.labels.map((label: string, index: number) => (
                <div key={label} className="flex flex-col items-center">
                  <div 
                    className="bar-chart-bar" 
                    style={{ height: `${(chartData.values[index] / maxValue) * 100}%` }}
                    title={`${label}: ${chartData.values[index]}`}
                  >
                    {chartData.values[index]}
                  </div>
                  <div className="bar-chart-label mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'map':
         const mapContainerId = `${step.id}-map-container`;
         useEffect(() => {
            initializeMap(mapContainerId);
         // eslint-disable-next-line react-hooks/exhaustive-deps
         }, [initializeMap, mapContainerId]); 

        return (
            <div className="my-4">
                <h4 className="text-sm font-semibold text-accent-green mb-2">Resolved IP Locations (Mock)</h4>
                <div id={mapContainerId} className="leaflet-map-container">
                </div>
            </div>
        );
      default: return null;
    }
  };

  const renderSubStep = (subStep: MethodologySubStepItem, parentStepParams: Record<string, any>) => {
    return (
      <div key={subStep.id} className="mt-6 pl-4 border-l-2 border-gray-700">
        <h3 className="text-xl sm:text-2xl font-headings font-semibold text-accent-green mb-2">
          {subStep.title}
        </h3>
        {typeof subStep.description === 'string' ? (
            <div className="text-gray-300 font-body prose prose-sm prose-invert max-w-none leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: subStep.description }}></div>
          ) : (
            <div className="text-gray-300 font-body prose prose-sm prose-invert max-w-none leading-relaxed mb-3">{subStep.description}</div>
        )}

        {subStep.commands?.map((cmd, index) => (
          <CodeSnippet
            key={index}
            language={cmd.language}
            code={typeof cmd.code === 'function' ? cmd.code(parentStepParams) : cmd.code}
            showCopyButton={cmd.showCopyButton}
            className="text-sm"
          />
        ))}
        {subStep.explanation && (
            typeof subStep.explanation === 'string' ? (
              <div className="mt-2 text-xs text-gray-400 bg-gray-800/60 p-2 rounded-md border-l-2 border-accent-purple" dangerouslySetInnerHTML={{ __html: subStep.explanation}}></div>
            ) : (
              <div className="mt-2 text-xs text-gray-400 bg-gray-800/60 p-2 rounded-md border-l-2 border-accent-purple">{subStep.explanation}</div>
            )
        )}
        {subStep.tips && subStep.tips.length > 0 && (
            <div className="mt-2 p-2 bg-yellow-600/10 border-l-2 border-yellow-500 rounded-md">
                <h5 className="font-semibold text-yellow-500 text-xs mb-1"><i className="fas fa-lightbulb mr-1"></i>Sub-Step Tips:</h5>
                <ul className="list-disc list-inside text-xs text-yellow-400 space-y-0.5">
                    {subStep.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
            </div>
        )}
      </div>
    );
  };


  return (
    <div className="bg-transparent min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-text-off-white">
      <div className="container mx-auto">
        <header className="text-center mb-10 pt-10">
          <h1 className="text-4xl sm:text-5xl font-headings font-bold text-accent-blue transition-all duration-300 hover-neon-glow-blue">
            <i className="fas fa-shoe-prints mr-3"></i>Web App Pentest Methodology
          </h1>
          <p className="text-lg text-gray-400 mt-2">An interactive, detailed guide through common penetration testing phases.</p>
        </header>

        <div className="lg:hidden mb-6 text-center">
          <button 
            onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
            className="bg-accent-purple text-base-dark font-headings py-2 px-4 rounded-md shadow-md hover:bg-opacity-80 transition-colors hover-neon-glow-purple"
          >
            <i className="fas fa-list-ul mr-2"></i> Table of Contents
          </button>
        </div>
        
        {isMobileTocOpen && (
          <div className="fixed inset-0 bg-base-dark/95 z-[60] p-6 lg:hidden custom-scrollbar overflow-y-auto">
             <button onClick={() => setIsMobileTocOpen(false)} className="absolute top-4 right-4 text-3xl text-accent-red hover:text-white">&times;</button>
            <h2 className="text-2xl font-headings text-accent-green mb-4">Table of Contents</h2>
            <nav>
              <ul className="space-y-2">
                {tocItems.map(item => (
                  <li key={item.id}>
                    <Link
                      to={`#${item.id}`}
                      onClick={() => setIsMobileTocOpen(false)}
                      className={`block py-2 px-3 rounded-md transition-colors ${activeTocId === item.id ? 'bg-accent-green/20 text-accent-green font-semibold' : 'hover:bg-gray-700 hover:text-white'}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}


        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-1/4 methodology-toc-sticky custom-scrollbar overflow-y-auto pr-4">
            <h2 className="text-xl font-headings text-accent-green mb-4">Table of Contents</h2>
            <nav>
              <ul className="space-y-1">
                {tocItems.map(item => (
                  <li key={item.id}>
                    <Link
                      to={`#${item.id}`}
                      className={`methodology-toc-link block py-1.5 px-3 border-l-2 transition-all duration-200 ${activeTocId === item.id ? 'text-accent-green font-semibold border-accent-green bg-accent-green/10' : 'text-gray-400 border-gray-700 hover:text-accent-blue hover:border-accent-blue'}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="lg:w-3/4 space-y-16"> 
            {PENETRATION_TESTING_STEPS.map(step => {
              const currentStepParams = interactiveParams[step.id] || {};
              return (
              <section 
                key={step.id} 
                id={step.id} 
                ref={(el: HTMLElement | null) => { sectionRefs.current[step.id] = el; }}
                className="pt-4 pb-8 border-b border-gray-800" 
              >
                <h2 className="text-2xl sm:text-3xl font-headings font-bold text-accent-blue mb-3">
                  <i className={`${step.icon} mr-3 text-accent-purple`}></i>{step.title}
                </h2>
                {typeof step.description === 'string' ? (
                  <div className="text-gray-300 font-body prose prose-invert max-w-none leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: step.description }}></div>
                ) : (
                  <div className="text-gray-300 font-body prose prose-invert max-w-none leading-relaxed mb-4">{step.description}</div>
                )}
                
                {step.interactiveElement && renderInteractiveElement(step)}

                {step.commands?.map((cmd, index) => (
                  <CodeSnippet
                    key={`main-cmd-${index}`}
                    language={cmd.language}
                    code={typeof cmd.code === 'function' ? cmd.code(currentStepParams) : cmd.code}
                    showCopyButton={cmd.showCopyButton}
                  />
                ))}

                {step.explanation && (
                    typeof step.explanation === 'string' ? (
                        <div className="mt-3 text-sm text-gray-400 bg-gray-800/50 p-3 rounded-md border-l-2 border-accent-purple" dangerouslySetInnerHTML={{ __html: step.explanation }}></div>
                    ) : (
                         <div className="mt-3 text-sm text-gray-400 bg-gray-800/50 p-3 rounded-md border-l-2 border-accent-purple">{step.explanation}</div>
                    )
                )}
                
                {step.subSteps && step.subSteps.length > 0 && (
                  <div className="mt-6 space-y-8">
                    {step.subSteps.map(subStep => renderSubStep(subStep, currentStepParams))}
                  </div>
                )}

                {step.tips && step.tips.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-500/10 border-l-2 border-yellow-400 rounded-md">
                        <h4 className="font-semibold text-yellow-400 text-sm mb-1"><i className="fas fa-lightbulb mr-2"></i>Phase Tips:</h4>
                        <ul className="list-disc list-inside text-xs text-yellow-300 space-y-1">
                            {step.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </div>
                )}
                 {step.visualizations && renderVisualizations(step)}
              </section>
            )})}

            <section id="bonus-tools" className="pt-8">
              <h2 className="text-3xl font-headings font-bold text-accent-green mb-6"><i className="fas fa-tools mr-3"></i>Bonus Tools Arsenal</h2>
              <div className="space-y-6">
                {BONUS_TOOLS_DATA.map(tool => (
                  <details key={tool.id} className="bg-base-light-dark p-4 rounded-lg shadow-md group border border-gray-700 hover:border-accent-green">
                    <summary className="font-headings font-semibold text-xl text-accent-green group-hover:text-white cursor-pointer list-none flex justify-between items-center">
                      <span><i className={`${tool.icon || 'fas fa-toolbox'} mr-2`}></i>{tool.name}</span>
                       <i className="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-sm text-gray-300 mb-2 prose prose-sm prose-invert max-w-none">{tool.description}</p>
                      <p className="text-xs text-gray-400 mb-2">Learn more: <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">{tool.url}</a></p>
                      <h4 className="text-sm font-semibold text-accent-purple mt-2 mb-1">Example Usage:</h4>
                      <CodeSnippet language="bash" code={tool.usageExample.command} />
                      {tool.usageExample.explanation && <p className="text-xs text-gray-400 mt-1 italic">{tool.usageExample.explanation}</p>}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PenetrationTestingMethodologyPage;